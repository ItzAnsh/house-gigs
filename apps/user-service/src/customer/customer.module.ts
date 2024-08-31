import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { Customer } from '../entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gigster } from '../entities/gigster.entity';
import { Gig } from '../entities/gig.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer, Gigster, Gig])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
