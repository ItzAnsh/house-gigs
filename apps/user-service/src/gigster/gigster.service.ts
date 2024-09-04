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
import { In } from 'typeorm';
import { HttpException } from '@nestjs/common';

function getHourDifference(start: Date, end: Date) {
  return (end.getTime() - start.getTime()) / 60 / 60 / 1000;
}

@Injectable()
export class GigsterService {
  constructor(
    @InjectRepository(Gigster) private gigsterRepository: Repository<Gigster>,
    @InjectRepository(Slot) private slotRepository: Repository<Slot>,
    @InjectRepository(Gig) private GigRepo: Repository<Gig>,
    @InjectRepository(Package) private packageRepository: Repository<Package>,
  ) {}

  async createGigster(gigster: any) {
    try {
      // Check if the gigster already exists by user ID
      const foundGigster = await this.gigsterRepository.findOne({
        where: { user: { id: gigster.userId } },
      });

      if (foundGigster) {
        throw new HttpException('Gigster already exists', 400);
      }

      // Parse the input data using DTO validation
      const parsedData = gigsterDTO.parse(gigster);

      // Fetch the associated slot timings from the slot repository
      const slotTimings = await this.slotRepository.findBy({
        id: In(parsedData.slotTimings),
      });

      // Fetch the associated packages from the package repository
      const packages = await this.packageRepository.findBy({
        id: In(parsedData.packages),
      });

      // Create a new Gigster entity and assign parsed data
      const newGigster = new Gigster();
      Object.assign(newGigster, {
        user: { id: parsedData.userId } as User,
        slotTimings: slotTimings as Slot[],
        packages: packages as Package[],
        available: parsedData.available,
        gig: { id: parsedData.gigId } as Gig,
      });

      // Save the new gigster to the repository and return the saved entity
      return await this.gigsterRepository.save(newGigster);
    } catch (e) {
      // Log the error and rethrow it
      console.error('Error creating Gigster:', e || e);
      throw e;
    }
  }

  async getGigsterById(id: string): Promise<Gigster> {
    return this.gigsterRepository.findOne({
      where: { id: id as UUID },
      relations: ['user', 'gig'],
      select: {
        id: true,
        available: true,
        gigId: true,
        rating: true,
        gig: {
          name: true,
        },
        slotTimings: true,
        packages: true,
        user: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      },
    });
  }

  async getGigsterByUserId(userId: string): Promise<Gigster> {
    return await this.gigsterRepository.findOne({
      where: {
        user: {
          id: userId, // Directly use userId here
        },
      },
      relations: ['user', 'gig'], // Include related 'userId' entity
      select: {
        id: true,
        available: true,
        gigId: true,
        slotTimings: true,
        packages: true,
        user: {
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
      relations: ['user', 'gig', 'slotTimings'],
    });
  }

  async updateGigster() {
    // const found = await this.GigRepo.findOne({
    //   where: {
    //     id: 'bc1d9be7-0de0-4428-8b36-e33b5ac79641',
    //   },
    // });

    // const gigster = await this.gigsterRepository.findOne({
    //   where: {
    //     userId: {
    //       id: 'e37c11d0-7aff-4cf2-81a1-51a5ffe515a1',
    //     },
    //   },
    // });

    // gigster.gig = found;
    return await this.gigsterRepository.clear();
  }

  async addTimeSlot(slot: SlotAdd) {
    // const AllSlots = this.slotRepository.find();

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

  async addTimeSlotToGigster(body: any) {
    if (!body.userId) {
      throw new HttpErrorByCode[401]('Unauthorized');
    }

    const gigster = await this.gigsterRepository.findOne({
      where: { user: { id: body.userId } },
      relations: ['slotTimings'],
    });

    if (!gigster) {
      throw new HttpErrorByCode[404]('Gigster not found');
    }

    const slots = await this.slotRepository.findBy({
      id: In(body.slots),
    });

    if (slots.length === 0) {
      throw new HttpErrorByCode[404]('Slots not found');
    }

    const alreadySlots = [...gigster.slotTimings];

    body.slots.forEach((slotId) => {
      if (!alreadySlots.some((slot) => slot.id === slotId)) {
        const newSlot = slots.find((s) => s.id === slotId);
        if (newSlot) {
          alreadySlots.push(newSlot);
        }
      }
    });

    gigster.slotTimings = alreadySlots;

    return await this.gigsterRepository.save(gigster);
  }

  async getSlots() {
    return await this.slotRepository.find();
  }

  async getTopGigsters({ gigId }) {
    const gigsters = await this.gigsterRepository.find({
      where: {
        gig: {
          id: gigId,
        },
      },
      relations: ['user', 'packages'],
      take: 10,
    });

    console.log(gigsters);

    gigsters.sort((a, b) => {
      return b.rating - a.rating;
    });

    return gigsters.slice(0, 5);
  }
}
