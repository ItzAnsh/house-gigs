import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001
        }
      },
      {
        name: 'BOOKING_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3002
        }
      }
    ])
  ],
  providers: [PackagesService],
  controllers: [PackagesController]
})
export class PackagesModule {}
