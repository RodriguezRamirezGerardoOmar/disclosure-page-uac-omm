/*
Input: name (string), excercises (array of Excercise), notes (array of Note), comment (Comment)
Output: Category entity with relations to exercises, notes, and comment
Return value: Category entity for database persistence
Function: Represents the structure and relationships of the category entity in the system
Variables: name, excercises, notes, comment
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

import { Excercise } from 'src/excercises/entities/excercise.entity';
import { BaseEntity } from '../../entities/base.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';
import { Note } from 'src/notes/entities/note.entity';

@Entity()
export class Category extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Excercise, excercise => excercise.category)
  excercises: Excercise[];

  @OneToMany(() => Note, note => note.category)
  notes: Note[];

  // una categoria puede tener solo un comentario
  @ManyToOne(() => Comment, comment => comment.category)
  @JoinTable()
  comment: Comment;
}
