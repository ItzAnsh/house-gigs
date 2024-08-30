import { NestFactory } from '@nestjs/core';
import { BookingServiceModule } from './booking-service.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(BookingServiceModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.HOST,
      port: 3002,
    },
  });

  await app.listen();
}
bootstrap();
