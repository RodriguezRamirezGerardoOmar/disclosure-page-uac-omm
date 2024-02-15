import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Memory extends BaseEntity {
  @Column({ nullable: false, unique: true })
  memoryLimit: number;
}
