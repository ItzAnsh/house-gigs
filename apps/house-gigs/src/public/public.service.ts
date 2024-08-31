import { Inject, Injectable } from '@nestjs/common';
import {Gigster} from '../entities/gigster.entity';
import {Gig} from "../entities/gig.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PublicService {
    constructor(@InjectRepository(Gigster) private gigsterRepository: Repository<Gigster>,
                @InjectRepository(Gig) private gigRepository: Repository<Gig>) {
    }

    async findAllGigsters(limit: number): Promise<Gigster[]> {
        return this.gigsterRepository.find({
            relations: ['gig', 'user'],
            order: {
                rating: 'DESC'
            },
            take: limit > 9 ? 9 : limit
        });
    }

    async findAllGigs(limit: number): Promise<Gig[]> {
        return this.gigRepository.find({
            order: {
                rating: 'DESC'
            },
            take: 36 < limit ? 36 : limit
        });
    }

    async homepage(gigLimit: number, gigsterLimit: number) {
        return {
            gigsters: await this.findAllGigsters(gigsterLimit),
            gigs: await this.findAllGigs(gigLimit)
        };
    }
}
