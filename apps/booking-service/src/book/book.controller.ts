import { Controller, Get, Post, Request, Body, Param } from '@nestjs/common';
import { Booking } from '../entities/booking.entity';
import { BookService } from './book.service';
import { MessagePattern } from '@nestjs/microservices';
import { Gig } from '../entities/gig.entity';
import { Gigster } from '../entities/gigster.entity';

@Controller('bookPriv')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @MessagePattern("bookings.showUserBookings")
    async getBookingsByCustomerId(@Body() body): Promise<Booking[]> {
        return this.bookService.getBookingsByCustomerId(body);
    }

    @MessagePattern("bookings.showGigsterBookings")
    async getBookingsByGigsterId(@Body() body): Promise<Booking[]> {
        return this.bookService.getBookingsByGigsterId(body
        );
    }


    @MessagePattern("booking.create")
    async createBooking(@Request() req, @Body() body): Promise<Booking> {
        return this.bookService.createBooking(req.body);
    }

    @MessagePattern("booking.updateStatus")
    async updateBookingStatus(@Body() body): Promise<Booking> {
        return this.bookService.updateBookingStatus(body.id, body.status);
    }

    @MessagePattern("booking.search")
    async search(@Body() body): Promise<Gigster[]> {
        return this.bookService.search(body);
    }
}
