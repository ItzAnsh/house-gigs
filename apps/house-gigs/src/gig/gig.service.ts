import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GigService {
    constructor(
  @Inject('USER_SERVICE') private readonly userService: ClientProxy) {};

    sendServiceRequest(message: string, body: object) {
        return this.userService.send(message, body);
    }
}
