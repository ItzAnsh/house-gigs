import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {UUID} from 'crypto';

@Entity()
export class Slot {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column({
        nullable: false,
    })
    start: Date

    @Column({
        nullable: false,
    })
    end: Date
}