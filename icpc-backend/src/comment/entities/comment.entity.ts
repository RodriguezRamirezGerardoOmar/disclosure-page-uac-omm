import { Category } from 'src/categories/entities/category.entity';
import { BaseEntity } from 'src/entities/base.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Column, Entity, OneToMany } from 'typeorm';

/*
Input: body (string)
Output: Comment entity with relations to categories, notes, and tickets
Return value: Comment entity for database persistence
Function: Represents the structure and relationships of the comment entity in the system
Variables: body, category, notes, tickets
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Entity()
export class Comment extends BaseEntity {
  @Column({ nullable: false })
  body: string;

  @OneToMany(() => Category, category => category.comment)
  category: Category[];

  @OneToMany(() => Note, note => note.commentId, { onDelete: 'SET NULL' })
  notes: Note[];

  @OneToMany(() => Ticket, ticket => ticket.commentId)
  tickets: Ticket[];
}
