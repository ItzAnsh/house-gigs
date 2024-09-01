import { Inject, Injectable } from '@nestjs/common';
import {Gigster} from '../entities/gigster.entity';
import {Gig} from "../entities/gig.entity";
import { Package } from '../entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class PublicService {
    constructor(@InjectRepository(Gigster) private gigsterRepository: Repository<Gigster>,
                @InjectRepository(Gig) private gigRepository: Repository<Gig>,
                @InjectRepository(Package) private packageRepository: Repository<Package>) {
    }

    async findAllPackages(limit: number): Promise<Package[]> {
        return this.packageRepository.find({
            relations: ['gig', 'gigster', 'gigster.user'],
            order: {
                gigster: {
                    rating: 'DESC'
                }
            },
            take: limit > 9 ? 9 : limit
        });
    }

    async findAllGigs(limit: number): Promise<Gig[]> {
        return this.gigRepository.find({
          order: {

              rating: 'DESC',
          },
          take: 36 < limit ? 36 : limit,
        });
    }

    async homepage(gigLimit: number, packageLimit: number) {
        return {
            gigsters: await this.findAllPackages(packageLimit),
            gigs: await this.findAllGigs(gigLimit)
        };
    }

    async getGigsterTime(id: string) {
        const result = await this.gigsterRepository.findOne({
            relations: [ 'slotTimings'],
            where: {
                id: id
            },
            select: {
                slotTimings: true
            }
        });

        // console.log(result);

        if (!result) {
            throw new HttpErrorByCode['404']('Gigster not found');
        }

        return result.slotTimings;
    }
}
