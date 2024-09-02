import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UserServiceModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: +process.env.NODE_ENV == 1 ? 10000 : 3001,
    },
  });

  await app.listen();
}
bootstrap();
