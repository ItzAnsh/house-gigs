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

    async findAllGigsters(): Promise<Gigster[]> {
        return this.gigsterRepository.find({
            relations: ['gig', 'user'],
            order: {
                rating: 'DESC'
            },
            take: 9
        });
    }

    async findAllGigs(): Promise<Gig[]> {
        return this.gigRepository.find({
            order: {
                rating: 'DESC'
            },
            take: 18
        });
    }

    async homepage() {
        return {
            gigsters: await this.findAllGigsters(),
            gigs: await this.findAllGigs()
        };
    }
}
