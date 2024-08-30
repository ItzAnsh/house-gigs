import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gig } from '../entities/gig.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { GigDto } from './dto/gig.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class GigService {
  constructor(@InjectRepository(Gig) private gigRepository: Repository<Gig>) {}

  async findAll(): Promise<Gig[]> {
    return await this.gigRepository.find();
  }

  async create(gig: Gig): Promise<Gig> {
    try {
        GigDto.parse(gig);
        return await this.gigRepository.save(gig);
    } catch(e) {
        throw new HttpErrorByCode[400]('Invalid Data passed');
    }
  }

  async remove(id: String): Promise<Gig> {
    const gig = await this.gigRepository.findOne({ where: { id: id as UUID } });
    return await this.gigRepository.remove(gig);
  }

    async find(id: String): Promise<Gig> {
        return await this.gigRepository.findOne({ where: { id: id as UUID } });
    }

    async delete(id: string): Promise<void> {
        const gig = await this.gigRepository.findOne({ where: { id: id } });
        await this.gigRepository.delete(gig);
    }
}
