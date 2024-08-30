import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from 'typeorm';
import { Booking } from './booking.entity';

export enum UserRole {
  GIGSTER = 'gigster',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  // @OneToOne(() => Booking, (booking) => booking.userId)
  id: string; // Primary key without the @OneToOne decorator

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    nullable: false,
    default: false,
  })
  isVerified: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;
}
