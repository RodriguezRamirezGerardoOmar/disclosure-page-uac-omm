import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Time extends BaseEntity {
  @Column({ nullable: false, unique: true })
  timeLimit: number;
}
