import { Controller, Get } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Controller()
export class UserServiceController {
  constructor(private readonly userServiceService: UserServiceService) {}

  @Get()
  getHello(): string {
    return this.userServiceService.getHello();
  }

  @MessagePattern('ping')
  ping(@Payload() data) {
    return of('pong').pipe(delay(1000));
  }

  @MessagePattern('user.createDetails')
  async createUserDetails(@Payload() data) {}

  @MessagePattern('user.getDetails')
  async getUserDetails(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.updateDetails')
  async updateUserDetails(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.deleteDetails')
  async deleteUserDetails(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.addSlot')
  async addSlot(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.getSlot')
  async getSlot(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.updateSlot')
  async updateSlot(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.deleteSlot')
  async deleteSlot(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.addPackage')
  async addPackage(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.getPackage')
  async getPackage(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.updatePackage')
  async updatePackage(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.deletePackage')
  async deletePackage(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.addBooking')
  async addBooking(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.getBooking')
  async getBooking(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('gigster.turnOn')
  async turnOnGigster(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('gigster.turnOff')
  async turnOffGigster(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.addPrefrences')
  async addPrefrences(@Payload() data) {
    return { xd: 'pong' };
  }

  @MessagePattern('user.removePrefrences')
  async removePrefrences(@Payload() data) {
    return { xd: 'pong' };
  }
}
