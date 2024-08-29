import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from 'apps/house-gigs/src/entities/user.entity';
import { Gigster } from '../entities/gigster.entity';
import { Slot } from '../entities/slot.entity';
import { Package } from '../entities/package.entity';
import { Gig } from '../entities/gig.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User, Gigster, Slot, Package, Gig])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
