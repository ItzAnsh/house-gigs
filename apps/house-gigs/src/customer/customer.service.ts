import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('USER_SERVICE') private userService: ClientProxy,
    @Inject('BOOKING_SERVICE') private bookingService: ClientProxy,
  ) {}

  async sendUserService(message: string, body: any) {
    return this.userService.send(message, body);
  }

  async sendBookingService(message: string, body: any) {
    return this.bookingService.send(message, body);
  }
}
