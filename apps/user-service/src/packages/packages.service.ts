import { Injectable } from '@nestjs/common';
import { Package } from '../entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { packageDto } from './dto/packageDto';
import { Gig } from '../entities/gig.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package) private packageRepository: Repository<Package>,
    @InjectRepository(User) private userRepository: Repository<User>,
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
    });
  }

  async createPackage(packageData: any): Promise<Package> {
    const foundUser = await this.userRepository.findOne({
      where: {
        id: packageData.userId,
      },
    });

    if (!foundUser || foundUser.role == 'user') {
      throw new Error('User not found');
    }

    try {
      const newPackage = new Package();
      const parsedData = packageDto.parse(packageData);
      Object.assign(newPackage, {
        name: parsedData.name,
        description: parsedData.description,
        user: { id: parsedData.user } as User,
        currency: parsedData.currency,
        price: parsedData.price,
        gig: { id: parsedData.gig } as Gig,
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
    });
  }
}
