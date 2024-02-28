import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.SERVER_PORT || 3001;

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  await app.listen(port);

  console.log(`Port mysql test run: ${process.env.DATABASE_PORT}`);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
