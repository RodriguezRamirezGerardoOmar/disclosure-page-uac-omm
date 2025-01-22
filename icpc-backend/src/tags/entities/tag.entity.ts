import { BaseEntity } from 'src/entities/base.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

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
