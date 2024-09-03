import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { PublicService } from './public.service';
import { Slot } from '../entities/slot.entity';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get('/home')
  async getHome(@Query('g') gigLimit, @Query('gi') packageLimit) {
    return await this.publicService.homepage(gigLimit, packageLimit);
  }

  @Post('/getGigsterTime')
  async getGigsterTime(@Body() body): Promise<Slot[]> {
    return await this.publicService.getGigsterTime(body.id);
  }
}
