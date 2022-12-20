import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  app.enableCors({
    origin: "*",
    credentials: true
  })

  const config = app.get(ConfigService)
  const port = config.get<number>("API_PORT")
  await app.listen(port || 3001, () => {
    console.log("Server started on port:" + port || 3001);
  });
}
bootstrap();
