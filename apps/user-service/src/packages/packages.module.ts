import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from '../entities/package.entity';
import { User } from '../entities/user.entity';
import { Gig } from '../entities/gig.entity';
import { Gigster } from '../entities/gigster.entity';
import { Booking } from '../entities/booking.entity';
import { Customer } from '../entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package, User, Gig, Gigster, Booking, Customer])],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
