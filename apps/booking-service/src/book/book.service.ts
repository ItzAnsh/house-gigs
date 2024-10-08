import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../entities/booking.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { BookingStatus } from '../entities/booking.entity';
import { Gigster } from '../entities/gigster.entity';
import { Gig } from '../entities/gig.entity';

async function isSafe(
  alreadyBookings: any,
  booking: any,
): Promise<boolean> {
  for (let i = 0; i < alreadyBookings.length; i++) {
    if (alreadyBookings[i].slot.id === booking.slot.id) {
      return false;
    }
    
  }
  return true;
}

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Gig) private gigRepository: Repository<Gig>,
    @InjectRepository(Gigster) private gigsterRepository: Repository<Gigster>,
  ) {}

  async createBooking(booking: any): Promise<Booking> {
    const alreadyBookings = await this.bookingRepository.find({
      where: {
        gigsterId: {
          id: booking.gigsterId,
        },
        status: BookingStatus.accepted,
      },
      relations: ['slotId'],
    });

    if (alreadyBookings.length > 0) {
      if (!(await isSafe(alreadyBookings, booking))) {
        throw new HttpErrorByCode[400]('Slot is already booked');
      }
    }
    return this.bookingRepository.save(booking);
  }

  // async getBookingById(id: string): Promise<Booking> {
  //   return this.bookingRepository.findOne({
  //     id: id
  //   });
  // }

  async getBookingsByCustomerId({ userId }): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        userId: {
          id: userId,
        },
      },
    });
  }

  async getBookingsByGigsterId({ gigsterId }): Promise<Booking[]> {
    return this.bookingRepository.find({
      where: {
        gigsterId: {
          id: gigsterId,
        },
      },
    });
  }

  // async updateBooking(booking: Booking): Promise<Booking> {
  //     return this.bookingRepository.save(booking);
  // }

  async deleteBooking(id: string): Promise<void> {
    await this.bookingRepository.delete(id);
  }

  async updateBookingStatus(
    id: string,
    status: BookingStatus,
  ): Promise<Booking> {
    const booking = await this.bookingRepository.findOne({ where: { id: id } });
    booking.status = status;
    return this.bookingRepository.save(booking);
  }

  async search({ searchText }: { searchText: string }): Promise<Gigster[]> {
    // Fetch all gigs from the database
    const gigsters = await this.gigsterRepository.find({
      relations: ['gig', 'user'],
    });

    const filteredGigsters = gigsters.filter((gigster) =>
      gigster.gig.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    return filteredGigsters;
  }
}
