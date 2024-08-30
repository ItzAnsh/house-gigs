import { Module } from '@nestjs/common';
import { BookingServiceController } from './booking-service.controller';
import { BookingServiceService } from './booking-service.service';
import { BookModule } from './book/book.module';
import { BookPubModule } from './book-pub/book-pub.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [
    BookModule, // Import BookModule
    BookPubModule, // Import BookPubModule
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      ssl: {rejectUnauthorized: false}, // Disable SSL
    }),
  ],
  controllers: [BookingServiceController],
  providers: [BookingServiceService], // Ensure BookingServiceService is provided
})
export class BookingServiceModule {}
