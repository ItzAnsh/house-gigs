import { Module } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { UserServiceService } from './user-service.service';
import { GigModule } from './gig/gig.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { GigsterModule } from './gigster/gigster.module';
import { PackagesModule } from './packages/packages.module';
import * as dotenv from 'dotenv';
dotenv.config();

// console.log(process.env.DATABASE_HOST, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, process.env.DATABASE_NAME);

@Module({
  imports: [
    GigModule,
    CustomerModule,
    GigsterModule,
    PackagesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
  ],
  controllers: [UserServiceController],
  providers: [UserServiceService],
})
export class UserServiceModule {}
