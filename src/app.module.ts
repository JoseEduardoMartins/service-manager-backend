import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
//CONFIG
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import mailConfig from './config/mail.config';
//MODULES
import { AddressesModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { CitiesModule } from './modules/cities/cities.module';
import { CountriesModule } from './modules/countries/countries.module';
import { MailModule } from './modules/mails/mail.module';
import { ProvidersModule } from './modules/providers/providers.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { StatesModule } from './modules/states/states.module';
import { UsersModule } from './modules/users/users.module';
//DECORATORS
import { ExistConstraint } from './common/decorators/is-exist';
import { UniqueConstraint } from './common/decorators/is-unique';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [appConfig, databaseConfig, mailConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get<string>('database.type'),
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          database: configService.get<string>('database.name'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.userpassword'),
          entities: ['./**/*.entity{ .ts,.js}'],
          synchronize: true,
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),
    AddressesModule,
    AuthModule,
    CitiesModule,
    CountriesModule,
    MailModule,
    ProvidersModule,
    SectorsModule,
    StatesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [UniqueConstraint, ExistConstraint],
})
export class AppModule {}
