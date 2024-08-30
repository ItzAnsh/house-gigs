import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany} from 'typeorm';
import { User } from './user.entity';
import { Gig } from './gig.entity';
import { Slot } from './slot.entity';

enum BookingStatus {
    pending = 'pending',
    accepted = 'accepted',
    rejected = 'rejected',
    completed = 'completed',
    cancelled = 'cancelled'
}

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    userId: User;

    @OneToOne(() => Gig, (gig) => gig.id)
    @JoinColumn()
    gigId: Gig;

    @OneToMany(() => Slot, (slot) => slot.id)
    @JoinColumn()
    slotId: Slot[];

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn()
    gigsterId: User;

    @Column({
        nullable: false,
        type: 'enum',
        enum: BookingStatus
    })
    status: BookingStatus;
}