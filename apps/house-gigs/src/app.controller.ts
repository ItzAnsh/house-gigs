import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'sum' })
  async accumulate(data: number[]): Promise<number> {
    return (data || []).reduce((a, b) => a + b);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/pingUserService')
  ping() {
    // console.log('pong');
    return this.appService.pingUserService('ping2', {});
  }

  

  @Post('/gigster/create')
  createGigster(@Body() body: any) {
    return this.appService.pingUserService('user.createGigster', body);
  }

  // @Get('/ping-user-service')
  // pingUserService() {
  //   return this.appService.pingUserService();
  // }
}
