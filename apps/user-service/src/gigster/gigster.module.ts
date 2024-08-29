import { Module } from '@nestjs/common';
import { GigsterController } from './gigster.controller';
import { GigsterService } from './gigster.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gigster } from '../entities/gigster.entity';
import { Slot } from '../entities/slot.entity';
import {User} from '../entities/user.entity';
import { Package } from '../entities/package.entity';
import { Gig } from '../entities/gig.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Gigster, Slot, User, Gig, Package])],
  controllers: [GigsterController],
  providers: [GigsterService],
})
export class GigsterModule {}
