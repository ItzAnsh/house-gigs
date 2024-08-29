import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UUID } from 'crypto';

@Entity()
export class Gig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    default: '<h1>This is a gig</h1>',
  })
  description: string;

  @Column({
    default: 0,
  })
  gigsterCount: number;

  @Column('text', {
    array: true,
    default: [],
  })
  images: string[];

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  rating: number;
}