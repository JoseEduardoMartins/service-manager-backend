import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { generateRandomText } from 'src/common/helpers/string';
import { domainFormatter } from '../../common/helpers/domain-formater';
import { MailService } from '../mails/mail.service';
import { UsersService } from '../users/users.service';
import { ConfirmAuthDto } from './dto/confirm-auth.dto';
import { SignInAuthDto } from './dto/sign-in-auth.dto';
import { SignUpAuthDto } from './dto/sign-up-auth.dto';
import { ProvidersService } from '../providers/providers.service';
import { ReceiversService } from '../receiver/receivers.service';
import { GenericCreateResponse } from 'src/common/interfaces/generic-response';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private mailService: MailService,
    private usersService: UsersService,
    private providersService: ProvidersService,
    private receiversService: ReceiversService,
  ) {}

  @ApiOperation({
    description: 'Autenticar de usuario.',
    tags: ['Auth'],
  })
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Body() loginAuthDto: SignInAuthDto,
  ): Promise<any> {
    const { userType, email, password } = loginAuthDto;

    const [responseUser] = await this.usersService.find({
      where: { email },
    });

    if (!responseUser)
      throw new UnauthorizedException(['Invalid email or password']);

    const [responseUserType] =
      userType === 'provider'
        ? await this.providersService.find({
            select: ['id', 'userId', 'taxId'],
            where: { userId: responseUser.id },
          })
        : await this.receiversService.find({
            select: ['id', 'userId', 'taxId'],
            where: { userId: responseUser.id },
          });

    if (!responseUserType)
      throw new UnauthorizedException(['Invalid email or password']);

    const user = {
      ...responseUser,
      ...responseUserType,
      userType,
    };

    if (user?.password !== password)
      throw new UnauthorizedException(['Invalid email or password']);

    if (!user.isActived)
      throw new UnauthorizedException(['User is not active, check your email']);

    if (!user.isVerified)
      throw new UnauthorizedException([
        'User is not verified, check your email',
      ]);

    if (user.isDeleted)
      throw new UnauthorizedException(['User is deleted, check your email']);

    const token = await this.jwtService.signAsync({
      role: userType,
      taxId: user.taxId,
      email: user.email,
    });

    const domain = domainFormatter(request.get('origin'));

    response.cookie('token', token, {
      httpOnly: true,
      secure: domain !== 'localhost',
      domain,
    });

    delete user.password;
    delete user.securityCode;
    delete user.isActived;
    delete user.isVerified;
    delete user.isDeleted;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.deletedAt;

    return {
      token,
      user,
    };
  }

  @ApiOperation({
    description: 'Registrar usuario.',
    tags: ['Auth'],
  })
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() signUpAuthDto: SignUpAuthDto) {
    const { userType, taxId, ...signUpAuth } = signUpAuthDto;

    const securityCode = generateRandomText(6, '123456789');

    const { id: userId } = await this.usersService.create({
      ...signUpAuth,
      securityCode,
    });

    let response: GenericCreateResponse;

    if (userType === 'provider') {
      response = await this.providersService.create({
        userId,
        taxId,
      });
    } else {
      response = await this.receiversService.create({
        userId,
        taxId,
      });
    }

    this.mailService.sendMail({
      to: signUpAuth.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './welcome',
      context: {
        name: signUpAuth.name,
        securityCode,
      },
    });

    return response;
  }

  @ApiOperation({
    description: 'Confirmar email de usuario.',
    tags: ['Auth'],
  })
  @Post('confirm-sign-up')
  @HttpCode(HttpStatus.NO_CONTENT)
  async confirm(@Body() confirmAuthDto: ConfirmAuthDto) {
    const { email, securityCode } = confirmAuthDto;

    const [user] = await this.usersService.find({
      select: ['id', 'securityCode'],
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid email');

    if (user?.securityCode !== securityCode)
      throw new UnauthorizedException('Invalid code');

    await this.usersService.update(user.id, {
      securityCode: null,
      isVerified: true,
    });
  }

  @ApiOperation({
    description: 'Recuperar informações de usuario.',
    tags: ['Auth'],
  })
  @Get('recover-user-imformation')
  async recoverUserImformation(@Req() request: Request) {
    const token = request.headers.token || request.cookies.token;
    const decodedToken = await this.jwtService.decode(token);

    const { role, email } = decodedToken;

    const [responseUser] = await this.usersService.find({
      select: ['id', 'name', 'phone', 'email', 'password'],
      where: { email },
    });

    const [responseUserType] =
      role === 'provider'
        ? await this.providersService.find({
            select: ['id', 'userId', 'taxId'],
            where: { userId: responseUser.id },
          })
        : await this.receiversService.find({
            select: ['id', 'userId', 'taxId'],
            where: { userId: responseUser.id },
          });

    const user = {
      ...responseUser,
      ...responseUserType,
      userType: role,
    };

    const renewedToken = await this.jwtService.signAsync({
      role,
      taxId: user.taxId,
      email,
    });

    return { user, token: renewedToken };
  }
}
