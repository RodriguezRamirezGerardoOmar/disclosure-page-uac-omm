import { BaseEntity } from 'src/entities/base.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { News } from 'src/news/entities/news.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Column, Entity, JoinTable, ManyToOne } from 'typeorm';

export enum TicketOperation {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

export enum TicketType {
  EXERCISE = 'exercise',
  NOTE = 'note',
  NEWS = 'news'
}

export enum TicketStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

@Entity()
export class Ticket extends BaseEntity {
  @ManyToOne(() => Excercise, excercise => excercise.ticketOriginal)
  @JoinTable()
  originalExerciseId: Excercise;

  @ManyToOne(() => Excercise, excercise => excercise.ticketModified)
  @JoinTable()
  modifiedExerciseId: Excercise;

  @ManyToOne(() => News, news => news.ticketOriginal)
  @JoinTable()
  originalNewsId: News;

  @ManyToOne(() => News, news => news.ticketModified)
  @JoinTable()
  modifiedNewsId: News;

  @ManyToOne(() => Note, note => note.ticketOriginal)
  @JoinTable()
  originalNoteId: Note;

  @ManyToOne(() => Note, note => note.ticketModified)
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
}
