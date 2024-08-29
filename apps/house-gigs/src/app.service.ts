import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  pingUserService(msg: string, body: object) {
    return this.userService.send(msg, body);
  }
}
