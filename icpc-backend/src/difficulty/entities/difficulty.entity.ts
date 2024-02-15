import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Difficulty extends BaseEntity {
  @Column({ nullable: false, unique: true })
  level: number;

  @Column({ nullable: false, unique: true })
  name: string;
}
