import { Controller, Get, Request, Param } from '@nestjs/common';
import { Booking } from '../entities/booking.entity';
import { BookPubService } from './book-pub.service';

@Controller('book-pub')
export class BookPubController {
    constructor(private readonly bookPubService: BookPubService) {}

  @Get('booking/:id')
  async getBookingById(@Request() req, @Param() param): Promise<Booking> {
    return this.bookPubService.getBookingById(param.id);
  }
}
