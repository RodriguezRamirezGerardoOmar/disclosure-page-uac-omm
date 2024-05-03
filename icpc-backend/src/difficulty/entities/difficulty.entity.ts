import { BaseEntity } from 'src/entities/base.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Difficulty extends BaseEntity {
  @Column({ nullable: false, unique: true })
  level: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Excercise, excercise => excercise.difficulty)
  excercises: Excercise[];
}
