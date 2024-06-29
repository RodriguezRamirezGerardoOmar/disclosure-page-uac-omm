import { BaseEntity } from 'src/entities/base.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { News } from 'src/news/entities/news.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

//TODO: Remove this class and use the one in the tickets entity
export enum ItemType {
  NOTE = 'note',
  EXCERCISE = 'excercise',
  NEWS = 'news'
}

@Entity()
export class Report extends BaseEntity {
  @Column({ nullable: false })
  summary: string;

  @Column({ nullable: false })
  report: string;

  @Column('enum', { nullable: false, enum: ItemType })
  itemType: ItemType;

  @ManyToOne(() => Note, note => note.reports)
  @JoinTable()
  note: Note;

  @ManyToOne(() => Excercise, excercise => excercise.reports)
  @JoinTable()
  excercise: Excercise;

  @ManyToOne(() => News, news => news.reports)
  @JoinTable()
  news: News;
}
