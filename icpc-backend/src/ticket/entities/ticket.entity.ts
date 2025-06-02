import { BaseEntity } from 'src/entities/base.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { News } from 'src/news/entities/news.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

/*
Input:
  - originalExerciseId: Reference to the original Excercise entity (nullable)
  - modifiedExerciseId: Reference to the modified Excercise entity (nullable)
  - originalNewsId: Reference to the original News entity (nullable)
  - modifiedNewsId: Reference to the modified News entity (nullable)
  - originalNoteId: Reference to the original Note entity (nullable)
  - modifiedNoteId: Reference to the modified Note entity (nullable)
  - itemType: Type of the item for the ticket (enum: TicketType)
  - commentId: Reference to the associated Comment entity
  - status: Status of the ticket (enum: TicketStatus)
  - operation: Operation type (enum: TicketOperation)
  - otherId: Additional identifier (string, optional)
Output:
  - Ticket entity instance with all fields and relationships
Return value: Entity representing a ticket in the system, linked to exercises, notes, news, comments, and supporting multiple operations and statuses
Function: Defines the structure and relationships for ticket records in the database, including item references, operation, status, and associations
Variables: originalExerciseId, modifiedExerciseId, originalNewsId, modifiedNewsId, originalNoteId, modifiedNoteId, itemType, commentId, status, operation, otherId
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Description:
  The Ticket entity models a ticket record in the system, supporting operations such as create, update, and delete for exercises, notes, news, and utility items. It includes references to original and modified items, operation type, status, associated comments, and an optional additional identifier. Used for tracking changes, moderation, and workflow management throughout the application.
*/

export enum TicketOperation {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

export enum TicketType {
  EXERCISE = 'exercise',
  NOTE = 'note',
  NEWS = 'news',
  UTILS = 'utils',
  USER = 'user'
}

export enum TicketStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

@Entity()
export class Ticket extends BaseEntity {
  @ManyToOne(() => Excercise, excercise => excercise.ticketOriginal, {
    onDelete: 'SET NULL'
  })
  @JoinTable()
  originalExerciseId: Excercise;

  @ManyToOne(() => Excercise, excercise => excercise.ticketModified, {
    onDelete: 'SET NULL'
  })
  @JoinTable()
  modifiedExerciseId: Excercise;

  @ManyToOne(() => News, news => news.ticketOriginal, {
    onDelete: 'SET NULL'
  })
  @JoinTable()
  originalNewsId: News;

  @ManyToOne(() => News, news => news.ticketModified, {
    onDelete: 'SET NULL'
  })
  @JoinTable()
  modifiedNewsId: News;

  @ManyToOne(() => Note, note => note.ticketOriginal, {
    onDelete: 'SET NULL'
  })
  @JoinTable()
  originalNoteId: Note;

  @ManyToOne(() => Note, note => note.ticketModified, {
    onDelete: 'SET NULL'
  })
  @JoinTable()
  modifiedNoteId: Note;

  @Column('enum', { nullable: false, enum: TicketType })
  itemType: TicketType;

  @ManyToOne(() => Comment, comment => comment.tickets)
  commentId: Comment;

  @Column('enum', {
    nullable: false,
    enum: TicketStatus,
    default: TicketStatus.PENDING
  })
  status: TicketStatus;

  @Column('enum', {
    nullable: false,
    enum: TicketOperation,
    default: TicketOperation.CREATE
  })
  operation: TicketOperation;

  @Column({ nullable: true })
  otherId: string;
}