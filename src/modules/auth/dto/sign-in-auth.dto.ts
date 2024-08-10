import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsEmail, Length, IsIn } from 'class-validator';
import { encrypt } from '../../../common/helpers/crypto';
import { UserType } from './sign-up-auth.dto';

export class SignInAuthDto {
  @ApiProperty({ required: true })
  @IsIn([UserType.PROVIDER, UserType.RECEIVER], {
    message: 'Tipo de usuário inválido. Deve ser "provider" ou "receiver"',
  })
  userType: UserType;

  @ApiProperty({ required: true })
  @IsEmail()
  @Length(0, 150)
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  @Transform(({ value }) => encrypt(value))
  @Length(8, 300)
  password: string;
}
