import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';

@Injectable()
export class BookPubService {
  constructor(
    @InjectRepository(Booking)
    private bookingPubRepository: Repository<Booking>,
  ) {}

  async getBookingById(id: string): Promise<Booking> {
    return await this.bookingPubRepository.findOne({
      where: {
        id: id,
      },
    });
  }
}
