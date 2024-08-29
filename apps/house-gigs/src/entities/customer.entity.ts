import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'crypto';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    nullable: false,
  })
  userId: UUID;

  @Column({
    default: [],
  })
  prefrences: [string];
}
