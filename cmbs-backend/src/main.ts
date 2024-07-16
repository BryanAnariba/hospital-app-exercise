import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger("CMBS-BACKEND");
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true,}));  app.enableCors();
  await app.listen(3000);
  logger.log(`Server Started on port: ${3000}`);
}
bootstrap();
