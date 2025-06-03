import { BaseEntity } from 'src/entities/base.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Column, Entity, OneToMany } from 'typeorm';

/*
Input: level (number), name (string), excercises (array of Excercise)
Output: Difficulty entity with relations to exercises
Return value: Difficulty entity for database persistence
Function: Represents the structure and relationships of the difficulty entity in the system
Variables: level, name, excercises
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Entity()
export class Difficulty extends BaseEntity {
  @Column({ nullable: false, unique: true })
  level: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => Excercise, excercise => excercise.difficulty)
  excercises: Excercise[];
}
