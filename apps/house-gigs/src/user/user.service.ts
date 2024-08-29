import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'apps/house-gigs/src/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { validate } from 'uuid';
import { UserCreationDto } from '../DTO/user.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User | null> {
    if (!validate(id)) {
      return null;
    }

    const id2 = id as UUID;
    return await this.userRepository.findOne({ where: { id: id2 } });
  }

  async findEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findAll(): Promise<User[]> {
    const arr = await this.userRepository.find();
    // console.log(arr);
    return arr;
  }

  async create(user: User): Promise<User> {
    // console.log(user);

    try {
      UserCreationDto.parse(user);
      user.password = await bcrypt.hash(user.password, 10);
    } catch (e) {
      console.log(e);
      throw new HttpErrorByCode[400]('Bad request');
    }

    const data = await this.userRepository.save(user);
    console.log(data);
    return data;
  }

  async update(id: number, user: { name: string }) {
    // const index = this.users.findIndex((user) => user.id === id);
    // this.userRepoitory[index].name = user.name;
  }

  async removeAll() {
    await this.userRepository.clear();
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
  }

  async verify(id: string) {
    await this.userRepository.update(id, { isVerified: true });
  }

  async RegisterUser(user: User) {}
}
