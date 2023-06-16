import { NestFactory } from '@nestjs/core';

import { TypeormExceptionFilter } from './utils/typeorm-exception.filter';
import { AppModule } from './app.module';
import { useSwagger } from './utils/use-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new TypeormExceptionFilter());

  useSwagger(app);

  await app.listen(3000);
}

bootstrap();
