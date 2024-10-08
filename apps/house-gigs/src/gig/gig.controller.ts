import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GigService } from './gig.service';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('gig')
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @Get('/')
  findAllGigs() {
    return this.gigService.sendServiceRequest('gig.findAllGigs', {});
  }

  @Get('/:id')
  async findGig(@Param('id') id: string) {
    if (!id) {
      throw new HttpErrorByCode[400]('No ID passed');
    }
    const res = await this.gigService.sendServiceRequest('gig.findGig', { id: id });
    console.log(res)

    return res;
  }

  @Post('/')
  createGig(@Body() body: { name: string; description: string }) {
    if (!body.name || !body.description) {
      throw new HttpErrorByCode[400]('No payload passed');
    }
    return this.gigService.sendServiceRequest('gig.createGig', {
      gig: { name: body.name, description: body.description },
    });
  }

  @Get('/delete/:id')
  removeGig(@Param('id') id: string) {
    if (!id) {
      throw new HttpErrorByCode[400]('No ID passed');
    }
    return this.gigService.sendServiceRequest('gig.removeGig', { id: id });
  }
}
