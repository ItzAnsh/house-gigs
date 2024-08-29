import { Module } from '@nestjs/common';
import { GigController } from './gig.controller';
import { GigService } from './gig.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gig } from '../entities/gig.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gig]),
  ],
  controllers: [GigController],
  providers: [GigService]
})
export class GigModule {}
