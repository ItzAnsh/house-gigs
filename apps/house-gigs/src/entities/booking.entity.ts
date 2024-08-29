import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {UUID} from 'crypto';
import { User } from 'apps/house-gigs/src/entities/user.entity';
import { Gig } from './gig.entity';
import { Slot } from './slot.entity';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @ManyToOne(() => User, (user) => user.id)
    userId: User;

    @ManyToOne(() => Gig, (gig) => gig.id)
    gigId: Gig;

    @ManyToOne(() => Slot, (slot) => slot.id)
    slotId: Slot;

    @ManyToOne(() => User, (user) => user.id)
    gigsterId: User;

    @Column({
        nullable: false,
        type: 'enum'
    })
    status: 'pending' | 'accepted' | 'rejected' | 'completed';
}