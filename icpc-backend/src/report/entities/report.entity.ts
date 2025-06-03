import { BaseEntity } from 'src/entities/base.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { News } from 'src/news/entities/news.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

/*
Input:
  - summary: Short summary of the report (string)
  - report: Detailed report content (string)
  - itemType: Type of the item being reported (enum: note, exercise, news)
  - isOpen: Boolean indicating if the report is open
  - note: Related Note entity (optional)
  - excercise: Related Excercise entity (optional)
  - news: Related News entity (optional)
Output:
  - Report entity instance with all fields and relationships
Return value: Entity representing a report in the system, linked to notes, exercises, or news
Function: Defines the structure and relationships for report records in the database, including type, status, and associations
Variables: summary, report, itemType, isOpen, note, excercise, news
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Description:
  The Report entity models a report record in the system, allowing users to report notes, exercises, or news. It includes a summary, detailed report, type of item being reported, open/closed status, and relationships to the relevant Note, Excercise, or News entities. Used for moderation, tracking, and management of reported content.
*/

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
