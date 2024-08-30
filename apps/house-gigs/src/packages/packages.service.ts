import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Injectable()
export class PackagesService {
    constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    ){}

    async sendPackageMessage(message: string, body: object) {
        try {
            return await this.userService.send(message, body);
        } catch (e) {
            throw e;
        }
    }
}
