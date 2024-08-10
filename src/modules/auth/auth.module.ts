import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from '../mails/mail.service';
import { ProvidersService } from '../providers/providers.service';
import { ReceiversService } from '../receiver/receivers.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { Provider } from '../providers/entities/provider.entity';
import { Receiver } from '../receiver/entities/receiver.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Provider, Receiver]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [UsersService, MailService, ProvidersService, ReceiversService],
  exports: [TypeOrmModule],
})
export class AuthModule {}
