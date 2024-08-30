import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Gigster } from './gigster.entity';

@Entity()
export class Slot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
  })
  start: Date;

  @Column({
    nullable: false,
  })
  end: Date;

  @ManyToMany(() => Gigster, (gigster) => gigster.slotTimings)
  gigsters: Gigster[];
}
