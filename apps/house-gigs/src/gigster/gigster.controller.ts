import { Controller, Request } from '@nestjs/common';
import { Get, Post, Body, Param } from '@nestjs/common';
import { GigsterService } from './gigster.service';

@Controller('gigster')
export class GigsterController {
  constructor(private readonly gigsterService: GigsterService) {}

  @Post('/addDetails')
  async addDetails(@Request() req, @Body() body) {
    const res = await this.gigsterService.sendServiceRequest(
      'user.createGigster',
      {
        ...body,
        userId: req.user,
      },
    );
    //   console.log(res);

    return res;
  }

  @Post('/updateDetails')
  async updateDetails(@Request() req, @Body() body) {
    const res = await this.gigsterService.sendServiceRequest(
      'user.updateGigster',
      {
        ...body,
        userId: req.user,
      },
    );
    //   console.log(res);

    return res;
  }

  @Post('/addTimeSlot')
  async addTimeSlot(@Request() req, @Body() body) {
    const res = await this.gigsterService.sendServiceRequest(
      'gigster.addTimeSlot',
      body,
    );
    //   console.log(res);

    return res;
  }

  @Get('/getTimeSlots')
  async getTimeSlots(@Request() req) {
    const res = await this.gigsterService.sendServiceRequest(
      'gigster.getTimeSlots',
      {},
    );
    //   console.log(res);

    return res;
  }

  @Get('/getAllGigsters')
  async getAllGigsters() {
    return await this.gigsterService.sendServiceRequest(
      'user.getAllGigsters',
      {},
    );
  }

  @Get('/updateGiggy')
  async updateGigster() {
    // console.log('here');
    // return 'here';
    const res = await this.gigsterService.sendServiceRequest(
      'gigster.update',
      {},
    );
    //   console.log(res);

    return res;
  }

  @Get('/:id')
  async getGigsterById(@Param('id') id: string) {
    const res = await this.gigsterService.sendServiceRequest(
      'user.getGigsterByUserId',
      { id },
    );
    // console.log(res);

    return res;
  }
}
