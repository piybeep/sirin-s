import { NestFactory } from '@nestjs/core';
import config from '@nestjs/config';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.use(cookieParser())
  const port = configService.get('API_PORT')
  await app.listen(port);
}
bootstrap();
