import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import express from 'express';
import { AppModule } from './app/app.module';
import { AppConfig } from './config/global.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: (origin, cb) => {
      cb(null, true);
    },
    credentials: true,
  });

  const appConfig = app.get(AppConfig);
  const logger = new Logger();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const globalPrefix = appConfig.APP_PREFIX;
  app.setGlobalPrefix(globalPrefix);
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb' }));
  app.use(cookieParser());
  //   app.useWebSocketAdapter(new WebsocketAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Crypto API')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${globalPrefix}/docs`, app, document);

  await app.listen(appConfig.APP_PORT);
  logger.log(
    `🚀 Application is running on: http://localhost:${appConfig.APP_PORT}/${globalPrefix}/docs`,
  );
}

bootstrap();
