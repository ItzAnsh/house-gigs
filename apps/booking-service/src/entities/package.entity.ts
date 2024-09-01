import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
} from 'typeorm';
import { Gig } from './gig.entity';
import { User } from './user.entity';
import { Gigster } from './gigster.entity';
// import { Gigster } from './gigster.entity';

export enum Currency {
  USD = '$',
  INR = '₹',
}

@Entity()
export class Package {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Gigster, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    default: '<h1>This is a package</h1>',
  })
  description: string;

  @Column({
    default: Currency.USD,
    type: 'enum',
    enum: Currency,
  })
  currency: Currency;

  @Column({
    nullable: false,
  })
  price: number;

  @ManyToOne(() => Gig)
  @JoinColumn()
  gig: Gig;

  @CreateDateColumn()
  createdAt: Date;
}
