import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gigster } from '../entities/gigster.entity';
import { Gig } from '../entities/gig.entity';
import { Package } from '../entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gigster, Gig, Package])],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
