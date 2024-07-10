import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
//CONFIG
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
//MODULES
import { UserModule } from './modules/users/users.module';
//DECORATORS
import { ExistConstraint } from './common/decorators/is-exist.validator';
import { UniqueConstraint } from './common/decorators/is-unique.validator';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      load: [appConfig, databaseConfig],
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
    UserModule,
  ],
  controllers: [],
  providers: [UniqueConstraint, ExistConstraint],
})
export class AppModule {}
