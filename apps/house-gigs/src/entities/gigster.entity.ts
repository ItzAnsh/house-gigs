import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
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

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Slot, (slot) => slot.id)
  @JoinTable() // Required for the owning side of a @ManyToMany relationship
  slotTimings: Slot[];

  @OneToMany(() => Package, (pkg) => pkg.id)
  @JoinColumn()
  packages: Package[];

  @Column({
    default: true,
  })
  available: boolean;

  @ManyToOne(() => Gig)
  @JoinColumn({ name: 'gigId' }) // Properly join with foreign key
  gig: Gig;

  @Column({
    nullable: false,
    type: 'uuid',
  })
  gigId: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  rating: number;
}
