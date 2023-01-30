import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.API_PORT);
}
bootstrap();
