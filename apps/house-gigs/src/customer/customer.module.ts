import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Package } from '../entities/package.entity';
import { Customer } from '../entities/customer.entity';
import { User } from '../entities/user.entity';
import { Gig } from '../entities/gig.entity';
import { Gigster } from '../entities/gigster.entity';
import { Slot } from '../entities/slot.entity';
import { Booking } from '../entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customer,
      User,
      Gig,
      Gigster,
      Slot,
      Booking,
      Package,
    ]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
      {
        name: 'BOOKING_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3002,
        },
      },
    ]),
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
