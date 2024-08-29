import { Controller, Body } from '@nestjs/common';
import { GigService } from './gig.service';
import { Gig } from '../entities/gig.entity';
import { Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('gig')
export class GigController {
  constructor(private readonly gigService: GigService) {}

  @MessagePattern('gig.findAllGigs')
  async findAll(): Promise<Gig[]> {
    // console.log("Something")
    return this.gigService.findAll();
  }

  @MessagePattern('gig.createGig')
  async createGig(@Body() body): Promise<Gig> {
    if (!body.gig) {
      throw new HttpErrorByCode[400]('No Payload passed');
    }
    return this.gigService.create(body.gig);
  }

  @MessagePattern('gig.removeGig')
  async removeGig(@Body() body): Promise<Gig> {
    // console.log(body)
    if (!body.id) {
      throw new HttpErrorByCode[400]('No ID passed');
    }
    return this.gigService.remove(body.id);
  }

  @MessagePattern('gig.findGig')
  async findGig(@Body() body): Promise<Gig> {
    if (!body.id) {
      throw new HttpErrorByCode[400]('No ID passed');
    }

    return this.gigService.find(body.id);
  }
}
