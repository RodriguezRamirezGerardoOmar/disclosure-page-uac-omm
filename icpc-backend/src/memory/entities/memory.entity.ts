import { BaseEntity } from 'src/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Excercise } from 'src/excercises/entities/excercise.entity';

@Entity()
export class Memory extends BaseEntity {
  @Column({ nullable: false, unique: true })
  memoryLimit: number;

  @OneToMany(() => Excercise, excercise => excercise.memoryId)
  excercises: Excercise[];
}
