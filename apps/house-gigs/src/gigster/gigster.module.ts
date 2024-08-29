import { Module } from '@nestjs/common';
import { GigsterService } from './gigster.service';
import { GigsterController } from './gigster.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001,
        },
      },
    ]),
  ],
  providers: [GigsterService],
  controllers: [GigsterController]
})
export class GigsterModule {}
