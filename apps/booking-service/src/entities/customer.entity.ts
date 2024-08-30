import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UUID } from 'crypto';
import { User } from './user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { eager: true }) // Relation to User
  userId: string;

  @Column({
    default: [],
    array: true
  })
  prefrences: string;
}
