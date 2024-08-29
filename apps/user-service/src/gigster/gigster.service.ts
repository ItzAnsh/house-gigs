import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gigster } from '../entities/gigster.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { gigsterDTO } from './dto/gigster.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Slot } from '../entities/slot.entity';
import { SlotAdd } from './types';
import { User } from '../entities/user.entity';
import { Package } from '../entities/package.entity';
import { Gig } from '../entities/gig.entity';
import { FindOptionsWhere } from 'typeorm';

function getHourDifference(start: Date, end: Date) {
  return (end.getTime() - start.getTime()) / 60 / 60 / 1000;
}

@Injectable()
export class GigsterService {
  constructor(
    @InjectRepository(Gigster) private gigsterRepository: Repository<Gigster>,
    @InjectRepository(Slot) private slotRepository: Repository<Slot>,
    @InjectRepository(Gig) private GigRepo: Repository<Gig>,
  ) {}

  async createGigster(gigster: any) {
    try {
      const foundGigster = await this.gigsterRepository.findOne({
        where: {
          userId: {
            id: gigster.userId,
          },
        },
      });
      console.log(foundGigster);

      if (foundGigster) {
        throw new HttpErrorByCode[400]('Gigster already exists');
      }

      const newGigster = new Gigster();
      const parsedData = gigsterDTO.parse(gigster);
      console.log(parsedData);

      Object.assign(newGigster, {
        userId: { id: parsedData.userId } as User,
        slotTimings: [{ id: parsedData.slotTimings.toString() }] as Slot[],
        packages: [{ id: parsedData.packages.toString() }] as Package[],
        available: parsedData.available,
        gig: { id: parsedData.gigId } as Gig,
      });
      return await this.gigsterRepository.save(newGigster);
    } catch (e) {
      console.log(e);
      // return { Status: false };
      throw e;
    }
  }

  async getGigsterById(id: string): Promise<Gigster> {
    return this.gigsterRepository.findOne({
      where: { id: id as UUID },
      relations: ['userId'],
    });
  }

  async getGigsterByUserId(userId: string): Promise<Gigster> {
    return await this.gigsterRepository.findOne({
      where: {
        userId: {
          id: userId, // Directly use userId here
        },
      },
      relations: ['userId'], // Include related 'userId' entity
      select: {
        id: true,
        available: true,
        gigId: true,
        slotTimings: true,
        packages: true,
        userId: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      },
    });
  }

  async getGigstersByGigId(gigId: string) {
    return await this.gigsterRepository.find({
      where: {
        gig: {
          id: gigId,
        },
      },
    });
  }

  async getAllGigsters() {
    return await this.gigsterRepository.find({
      relations: ['userId', 'gig'],
    });
  }

  async updateGigster() {
    const found = await this.GigRepo.findOne({
      where: {
        id: 'bc1d9be7-0de0-4428-8b36-e33b5ac79641',
      },
    });

    const gigster = await this.gigsterRepository.findOne({
      where: {
        userId: {
          id: 'e37c11d0-7aff-4cf2-81a1-51a5ffe515a1',
        },
      },
    });

    // gigster.gig = found;
    return await this.gigsterRepository.clear();
  }

  async addTimeSlot(slot: SlotAdd) {
    const AllSlots = this.slotRepository.find();

    slot.start = new Date(slot.start);
    slot.end = new Date(slot.end);
    console.log(slot.start, slot.end);
    if (slot.start > slot.end) {
      throw new HttpErrorByCode[400]('Start time must be before end time');
    }

    const HourDiff = getHourDifference(slot.start, slot.end);
    if (HourDiff < 1 || HourDiff > 24) {
      throw new HttpErrorByCode[400]('Time slot should be 1 hour to 24 hours');
    }

    const newSlot = new Slot();
    Object.assign(newSlot, slot);
    return await this.slotRepository.save(newSlot);
  }

  async getSlots() {
    return await this.slotRepository.find();
  }
}
