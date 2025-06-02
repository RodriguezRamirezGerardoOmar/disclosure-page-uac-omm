import { BaseEntity } from 'src/entities/base.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

/*
Input:
  - name: Name of the tag (string, unique)
  - color: Hexadecimal color code for the tag (string, unique)
  - excercises: Array of Excercise entities associated with this tag
  - notes: Array of Note entities associated with this tag
Output:
  - Tag entity instance with all fields and relationships
Return value: Entity representing a tag in the system, linked to exercises and notes
Function: Defines the structure and relationships for tag records in the database, including name, color, and associations
Variables: name, color, excercises, notes
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/
@Entity()
export class Tag extends BaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, unique: true })
  color: string;

  @ManyToMany(() => Excercise, excercise => excercise.tags)
  excercises: Excercise[];

  @ManyToMany(() => Note, note => note.tags)
  notes: Note[];
}
