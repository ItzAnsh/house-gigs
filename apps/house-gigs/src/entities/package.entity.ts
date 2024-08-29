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

enum Currency {
  USD = '$',
  INR = '₹',
}

@Entity()
export class Package {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @OneToOne(() => Gig)
  @JoinColumn()
  gig: Gig;

  @CreateDateColumn()
  createdAt: Date;
}
