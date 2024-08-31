import { Module } from '@nestjs/common';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gigster } from '../entities/gigster.entity';
import { Gig } from '../entities/gig.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gigster, Gig])],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}
