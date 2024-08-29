import { Controller, Body } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GigsterService } from './gigster.service';
import { Gigster } from './types';

@Controller('gigster')
export class GigsterController {
  constructor(private readonly gigsterService: GigsterService) {}

  @MessagePattern('user.createGigster')
  async createGigster(@Body() body: any) {
    try {
      return await this.gigsterService.createGigster(body);
    } catch (e) {
      // console.log(e)
      return e;
    }
  }

  @MessagePattern('user.getGigsterById')
  async getGigsterById(@Body() body: any) {
    return await this.gigsterService.getGigsterById(body.data);
  }

  @MessagePattern('user.getGigsterByUserId')
  async getGigsterByUserId(@Body() body: { id: string }) {
    console.log(body);
    const res = await this.gigsterService.getGigsterByUserId(body.id);
    console.log(res);
    return res;
  }

  @MessagePattern('user.getAllGigsters')
  async getAllGigsters() {
    return await this.gigsterService.getAllGigsters();
  }

  @MessagePattern('gigster.addTimeSlot')
  async addTimeSlot(@Body() body: any) {
    return await this.gigsterService.addTimeSlot(body);
  }

  @MessagePattern('gigster.update')
  async update(@Body() body: any) {
    console.log('HEREEE');
    return await this.gigsterService.updateGigster();
  }
}
