import { BaseEntity } from 'src/entities/base.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Time extends BaseEntity {
  @Column({ nullable: false, unique: true })
  timeLimit: number;

  @OneToMany(() => Excercise, excercise => excercise.time)
  excercises: Excercise[];
}
