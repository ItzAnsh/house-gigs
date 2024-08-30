import { UUID } from 'crypto';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Slot } from './slot.entity';
import { Package } from './package.entity';
import { Gig } from './gig.entity';
import { User } from './user.entity';

@Entity()
export class Gigster {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, { eager: true }) // Relation to User
  @JoinColumn()
  userId: User;

  @OneToOne(() => Slot) // Relation to Slot
  @JoinColumn()
  slotTimings: Slot;

  @OneToOne(() => Package) // Relation to Package
  @JoinColumn()
  packages: Package;

  @Column({
    default: true,
  })
  available: boolean;

  @OneToOne(() => Gig, (gig) => gig.id) // Relation to Gig
  @JoinColumn()
  gig: Gig;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn()
  gigId: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  rating: number;
}
