import { Module } from '@nestjs/common';
import { BookPubController } from './book-pub.controller';
import {BookPubService} from './book-pub.service';
import { Booking } from '../entities/booking.entity';
import {User} from '../entities/user.entity';
import {Gig} from '../entities/gig.entity';
import {Gigster} from '../entities/gigster.entity';
import {Slot} from '../entities/slot.entity';
import {Customer} from '../entities/customer.entity';
import { Package } from '../entities/package.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, User, Gig, Gigster, Slot, Customer, Package]),
  ],
  providers: [BookPubService],
  controllers: [BookPubController],
})
export class BookPubModule {}
