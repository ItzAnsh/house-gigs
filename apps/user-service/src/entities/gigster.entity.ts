import { UUID } from 'crypto';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToMany,
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

  @OneToOne((_) => User, (user) => user.id)
  @JoinColumn()
  userId: User;

  @OneToOne(() => Slot, (slot) => slot.id)
  slotTimings: [UUID];

  @OneToOne(() => Package, (package1) => package1.id)
  packages: [UUID];

  @Column({
    default: true,
  })
  available: boolean;

  @OneToOne(() => Gig, (gig) => gig.id)
  @JoinColumn()
  gig: Gig;

  @Column({
    nullable: false,
    type: 'uuid',
  })
  gigId: UUID;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  rating: number;
}
