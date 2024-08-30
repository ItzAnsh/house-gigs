import { Injectable } from '@nestjs/common';
import { Package } from '../entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { packageDto } from './dto/packageDto';
import { Gig } from '../entities/gig.entity';
import { User } from '../entities/user.entity';
import { Currency } from '../entities/package.entity';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { Gigster } from '../entities/gigster.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package) private packageRepository: Repository<Package>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Gigster) private gigsterRepository: Repository<Gigster>,
  ) {}

  async findAll(): Promise<Package[]> {
    return this.packageRepository.find();
  }

  async findAllPackagesFromGig(gigId: string): Promise<Package[]> {
    return this.packageRepository.find({
      where: {
        gig: {
          id: gigId,
        },
      },

      relations: ['gig', 'user'],
    });
  }

  async createPackage(packageData: any): Promise<Package> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: packageData.userId,
      },
    });

    const foundGigster = await this.gigsterRepository.findOne({
      where: {
        // user: { id: foundUser.id },
        id: packageData.gigster,
      },
      relations: ['gig', 'user'],
    });
    console.log(foundGigster);


    if (!foundUser || !foundGigster || foundUser.role == 'user' || foundGigster.user.id !== foundUser.id) {
      throw new Error('User not found');
    }

    packageData.user = foundUser.id;
    packageData.gig = foundGigster.gig.id;
    try {
      const newPackage = new Package();
      const parsedData = packageDto.parse(packageData);
      Object.assign(newPackage, {
        name: parsedData.name,
        description: parsedData.description,
        user: { id: foundUser.id } as User,
        currency: parsedData.currency === 'USD' ? Currency.USD : Currency.INR,
        price: parsedData.price,
        gig: { id: foundGigster.gig.id } as Gig,
      });
      return await this.packageRepository.save(newPackage);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deletePackage(packageId: string): Promise<Package> {
    const packageToDelete = await this.packageRepository.findOne({
      where: {
        id: packageId,
      },
    });

    if (!packageToDelete) {
      throw new Error('Package not found');
    }
    return await this.packageRepository.remove(packageToDelete);
  }

  async findByUserId(userId: string) {
    return await this.packageRepository.find({
      where: {
        user: {
          id: userId,
        },
      },

      relations: ['gig', 'user'],

      select: {
        id: true,
        name: true,
        description: true,
        currency: true,
        price: true,
        user: {
          id: true,
          name: true,
          email: true,
          password: false,
          role: false,
          isVerified: false,
          created_at: false,
        },
        gig: {
          id: true,
          name: true,
        },
        // user: false,

        createdAt: true,
      },

      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findByGigId(gigId: string) {
    return await this.packageRepository.find({
      where: {
        gig: {
          id: gigId,
        },
      },
    });
  }

  async updateDescription(body: any) {
    const { packageId, description } = body;
    const packageToUpdate = await this.packageRepository.findOne({
      where: {
        id: packageId,
      },

      relations: ['user'],
    });

    // console.log(body.userId, packageToUpdate.user.id);

    if (body.userId !== packageToUpdate.user.id) {
      throw new HttpErrorByCode[401]('Unauthorized');
    }

    if (!packageToUpdate) {
      throw new Error('Package not found');
    }

    packageToUpdate.description = description;
    return await this.packageRepository.save(packageToUpdate);
  }
}
