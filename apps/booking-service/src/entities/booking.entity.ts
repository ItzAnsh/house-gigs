import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
// import { User } from 'apps/house-gigs/src/entities/user.entity';
import { Customer } from './customer.entity';
import { Gigster } from './gigster.entity';
import { Gig } from './gig.entity';
import { Slot } from './slot.entity';

export enum BookingStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
  completedByGigster = 'completed',
  cancelled = 'cancelled',
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Customer, (customer) => customer.id)
  @JoinColumn()
  userId: Customer;

  @OneToOne(() => Gig, (gig) => gig.id)
  @JoinColumn()
  gigId: Gig;

  @OneToMany(() => Slot, (slot) => slot.id)
  @JoinColumn()
  slotId: Slot[];

  @OneToOne(() => Gigster, (user) => user.id)
  @JoinColumn()
  gigsterId: Gigster;

  @Column({
    nullable: false,
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.pending,
  })
  status: BookingStatus;
}
