import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GigsterService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  async sendServiceRequest(message: string, body: object) {
    try {
      return await this.userService.send(message, body);
    } catch (e) {
      throw e;
    }
  }
}
