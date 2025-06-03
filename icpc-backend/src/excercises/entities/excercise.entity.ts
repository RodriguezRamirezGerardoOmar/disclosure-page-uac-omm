import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { User } from '../../users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Report } from 'src/report/entities/report.entity';

/*
Input: title (string), description (string), constraints (string), author (string), clue (string), solution (string), isVisible (boolean), user (User), category (Category), difficulty (Difficulty), tags (array of Tag), ticketOriginal (array of Ticket), ticketModified (array of Ticket), reports (array of Report)
Output: Excercise entity with relations to user, category, difficulty, tags, tickets, and reports
Return value: Excercise entity for database persistence
Function: Represents the structure and relationships of the excercise entity in the system
Variables: title, description, constraints, author, clue, solution, isVisible, user, category, difficulty, tags, ticketOriginal, ticketModified, reports
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Entity()
export class Excercise extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column('text', { nullable: false })
  description: string;

  @Column({ nullable: false })
  constraints: string;

  @Column({ nullable: false })
  author: string;

  @Column('text', { nullable: false })
  clue: string;

  @Column('text', { nullable: false })
  solution: string;

  @Column({ nullable: false })
  isVisible: boolean;

  @ManyToOne(() => User, user => user.excercises)
  user: User;

  @ManyToOne(() => Category, category => category.excercises)
  @JoinTable()
  category: Category;

  @ManyToOne(() => Difficulty, difficulty => difficulty.excercises)
  @JoinTable()
  difficulty: Difficulty;

  @ManyToMany(() => Tag, tag => tag.excercises)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Ticket, ticket => ticket.originalNoteId, {
    onDelete: 'CASCADE'
  })
  ticketOriginal: Ticket[];

  @OneToMany(() => Ticket, ticket => ticket.modifiedNoteId, {
    onDelete: 'CASCADE'
  })
  ticketModified: Ticket[];

  @OneToMany(() => Report, report => report.excercise, {
    onDelete: 'CASCADE'
  })
  reports: Report[];
}
