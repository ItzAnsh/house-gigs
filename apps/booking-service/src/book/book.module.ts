import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from '../entities/booking.entity';
import { User } from '../entities/user.entity';
import { Gig } from '../entities/gig.entity';
import { Gigster } from '../entities/gigster.entity';
import { Slot } from '../entities/slot.entity';
import { Package } from '../entities/package.entity';
import { Customer } from '../entities/customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, User, Gig, Gigster, Slot, Customer, Package]),
  ],
  providers: [BookService], // Only include the services used in this module
  controllers: [BookController],
  exports: [BookService], // Export if other modules need BookService
})
export class BookModule {}
