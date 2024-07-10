import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(cookieParser());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const configSwagger = new DocumentBuilder()
    .setTitle('Service Manager Backend')
    .setDescription(
      'Backend para o sistema service manager: uma plataforma de gerenciamento de serviços utilizando Nest.js e MySQL.',
    )
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'token',
        description: 'Token de acesso para as funcionalidades da API.',
        in: 'header',
      },
      'token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  const config = app.select(AppModule).get(ConfigService);
  await app.listen(config.get<number>('app.port'));
}
bootstrap();
