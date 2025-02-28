import { BaseEntity } from 'src/entities/base.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { News } from 'src/news/entities/news.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

//TODO: Remove this class and use the one in the tickets entity
export enum ItemType {
  NOTE = 'note',
  EXCERCISE = 'exercise',
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

  @Column({ type: 'boolean', default: false })
  isOpen: boolean;

  @ManyToOne(() => Note, note => note.reports, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  note: Note;

  @ManyToOne(() => Excercise, excercise => excercise.reports, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  excercise: Excercise;

  @ManyToOne(() => News, news => news.reports, {
    onDelete: 'CASCADE'
  })
  @JoinTable()
  news: News;
}
