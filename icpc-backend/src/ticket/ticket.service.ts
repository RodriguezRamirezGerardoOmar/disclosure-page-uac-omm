import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Ticket,
  TicketType,
  TicketStatus,
  TicketOperation
} from './entities/ticket.entity';
import { Repository } from 'typeorm';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Note } from 'src/notes/entities/note.entity';
import { News } from 'src/news/entities/news.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Image } from 'src/image/entities/image.entity';

/*
Input:
  - create: createTicketDto (ticket data)
  - findAll: none
  - findPending: none
  - findOne: id (string)
  - update: id (string), updateTicketDto (fields to update)
  - remove: id (string)
  - approve: id (string)
  - reject: id (string)
  - hasPendingTicket: itemId (string), itemType (TicketType)
Output:
  - create: Created ticket object or existing ticket
  - findAll: List of all tickets
  - findPending: List of pending tickets
  - findOne: Found ticket with related entities
  - update: Updated ticket
  - remove: Deleted ticket
  - approve: Approved ticket and updated related entities
  - reject: Rejected ticket and updated related entities
  - hasPendingTicket: Boolean indicating if a pending ticket exists
Return value: Service providing business logic and data access for tickets, including creation, retrieval, update, deletion, approval, rejection, and status checks
Function: Handles all CRUD operations, approval, rejection, and status checks for tickets, manages the Ticket entity, and integrates with related entities (exercises, notes, news, comments, images) for persistence and business logic
Variables: ticketRepository, excerciseRepository, notesRepository, newsRepository, commentRepository, imageRepository
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Description:
  The TicketService encapsulates all business logic and data access for tickets. It manages ticket creation, retrieval, updating, deletion, approval, rejection, and status checks, and interacts with related entities such as exercises, notes, news, comments, and images. The service ensures data integrity, validation, and proper handling of ticket operations, including updating related records and logging changes for auditing purposes.
*/

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Excercise)
    private readonly excerciseRepository: Repository<Excercise>,
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    @InjectRepository(News)
    private readonly newsRepository: Repository<News>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}
  async create(createTicketDto: CreateTicketDto) {
    const ticketType = createTicketDto.itemType;
    let originalId = '';
    let modifiedId = '';
    let ticket: Ticket;
    let original;
    let modified;
    let comment = await this.commentRepository.findOneBy({
      body: createTicketDto.description
    });
    // If the comment does not exist, create and save it
    if (comment === null) {
      comment = this.commentRepository.create();
      comment.body = createTicketDto.description;
      comment = await this.commentRepository.save(comment);
    }
    // Select logic based on ticket type
    switch (ticketType) {
      case 'exercise':
        originalId = createTicketDto.originalExerciseId;
        modifiedId = createTicketDto.modifiedExerciseId;
        original = await this.excerciseRepository.findOneBy({ id: originalId });
        modified = await this.excerciseRepository.findOneBy({ id: modifiedId });
        ticket = await this.ticketRepository.findOneBy({
          originalExerciseId: original,
          modifiedExerciseId: modified,
          commentId: comment
        });
        break;
      case 'note':
        originalId = createTicketDto.originalNoteId;
        modifiedId = createTicketDto.modifiedNoteId;
        original = await this.notesRepository.findOneBy({ id: originalId });
        modified = await this.notesRepository.findOneBy({ id: modifiedId });
        ticket = await this.ticketRepository.findOneBy({
          originalNoteId: original,
          modifiedNoteId: modified,
          commentId: comment
        });
        break;
      case 'news':
        originalId = createTicketDto.originalNewsId;
        modifiedId = createTicketDto.modifiedNewsId;
        original = await this.newsRepository.findOneBy({ id: originalId });
        modified = await this.newsRepository.findOneBy({ id: modifiedId });
        ticket = await this.ticketRepository.findOneBy({
          originalNewsId: original,
          modifiedNewsId: modified,
          commentId: comment
        });
        break;
    }
    // If the ticket does not exist, create and save a new one
    if (ticket === null) {
      let res = this.ticketRepository.create();
      res.commentId = comment;
      res.status = TicketStatus.PENDING;
      switch (ticketType) {
        case 'exercise':
          res.originalExerciseId = original;
          res.modifiedExerciseId = modified;
          res.itemType = TicketType.EXERCISE;
          break;
        case 'note':
          res.originalNoteId = original;
          res.modifiedNoteId = modified;
          res.itemType = TicketType.NOTE;
          break;
        case 'news':
          res.originalNewsId = original;
          res.modifiedNewsId = modified;
          res.itemType = TicketType.NEWS;
          break;
      }
      res = await this.ticketRepository.save(res);
      return res;
    }
    // If the ticket already exists, return it
    return ticket;
  }

  async findAll() {
    return await this.ticketRepository
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.commentId', 'comment')
      .getMany();
  }

  async findPending() {
    return await this.ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.status = :status', { status: TicketStatus.PENDING })
      .leftJoinAndSelect('ticket.commentId', 'comment')
      .orderBy('ticket.created_at', 'ASC')
      .getMany();
  }

  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOneBy({ id: id });
    switch (ticket.itemType) {
      case TicketType.EXERCISE:
        switch (ticket.operation) {
          case TicketOperation.UPDATE:
            const res = await this.ticketRepository
              .createQueryBuilder('ticket')
              .where('ticket.id = :id', { id: id })
              .leftJoinAndSelect('ticket.commentId', 'commentId')
              .leftJoinAndSelect(
                'ticket.originalExerciseId',
                'originalExerciseId'
              )
              .leftJoinAndSelect(
                'ticket.modifiedExerciseId',
                'modifiedExerciseId'
              )
              .getOne();
            const originalItem = await this.excerciseRepository
              .createQueryBuilder('excercise')
              .where('excercise.id = :id', { id: res.originalExerciseId.id })
              .leftJoinAndSelect('excercise.category', 'category')
              .leftJoinAndSelect('excercise.time', 'time')
              .leftJoinAndSelect('excercise.memoryId', 'memory')
              .leftJoinAndSelect('excercise.difficulty', 'difficulty')
              .leftJoinAndSelect('excercise.tags', 'tags')
              .getOne();
            const modifiedItem = await this.excerciseRepository
              .createQueryBuilder('excercise')
              .where('excercise.id = :id', { id: res.modifiedExerciseId.id })
              .leftJoinAndSelect('excercise.category', 'category')
              .leftJoinAndSelect('excercise.time', 'time')
              .leftJoinAndSelect('excercise.memoryId', 'memory')
              .leftJoinAndSelect('excercise.tags', 'tags')
              .leftJoinAndSelect('excercise.difficulty', 'difficulty')
              .getOne();
            return {
              ...res,
              originalExerciseId: originalItem,
              modifiedExerciseId: modifiedItem
            };
          default:
            return await this.ticketRepository
              .createQueryBuilder('ticket')
              .where('ticket.id = :id', { id: id })
              .leftJoinAndSelect('ticket.commentId', 'commentId')
              .leftJoinAndSelect(
                'ticket.originalExerciseId',
                'originalExerciseId'
              )
              .leftJoinAndSelect('originalExerciseId.category', 'category')
              .leftJoinAndSelect('originalExerciseId.time', 'time')
              .leftJoinAndSelect('originalExerciseId.memoryId', 'memory')
              .leftJoinAndSelect('originalExerciseId.tags', 'tags')
              .leftJoinAndSelect('originalExerciseId.difficulty', 'difficulty')
              .getOne();
        }
      case TicketType.NOTE:
        switch (ticket.operation) {
          case TicketOperation.UPDATE:
            const res = await this.ticketRepository
              .createQueryBuilder('ticket')
              .where('ticket.id = :id', { id: id })
              .leftJoinAndSelect('ticket.commentId', 'commentId')
              .leftJoinAndSelect('ticket.originalNoteId', 'originalNoteId')
              .leftJoinAndSelect('ticket.modifiedNoteId', 'modifiedNoteId')
              .getOne();
            const originalNote = await this.notesRepository
              .createQueryBuilder('note')
              .where('note.id = :id', { id: res.originalNoteId.id })
              .leftJoinAndSelect('note.commentId', 'comment')
              .leftJoinAndSelect('note.category', 'category')
              .leftJoinAndSelect('note.tags', 'tags')
              .getOne();
            const modifiedNote = await this.notesRepository
              .createQueryBuilder('note')
              .where('note.id = :id', { id: res.modifiedNoteId.id })
              .leftJoinAndSelect('note.commentId', 'comment')
              .leftJoinAndSelect('note.category', 'category')
              .leftJoinAndSelect('note.tags', 'tags')
              .getOne();
            return {
              ...res,
              originalNoteId: originalNote,
              modifiedNoteId: modifiedNote
            };
          default:
            return await this.ticketRepository
              .createQueryBuilder('ticket')
              .where('ticket.id = :id', { id: id })
              .leftJoinAndSelect('ticket.commentId', 'commentId')
              .leftJoinAndSelect('ticket.originalNoteId', 'originalNoteId')
              .leftJoinAndSelect('originalNoteId.commentId', 'comment')
              .leftJoinAndSelect('originalNoteId.category', 'category')
              .leftJoinAndSelect('originalNoteId.tags', 'tags')
              .getOne();
        }
      case TicketType.NEWS:
        return ticket.operation == TicketOperation.UPDATE
          ? await this.ticketRepository
              .createQueryBuilder('ticket')
              .where('ticket.id = :id', { id: id })
              .leftJoinAndSelect('ticket.commentId', 'commentId')
              .leftJoinAndSelect('ticket.originalNewsId', 'originalNewsId')
              .leftJoinAndSelect('ticket.modifiedNewsId', 'modifiedNewsId')
              .getOne()
          : await this.ticketRepository
              .createQueryBuilder('ticket')
              .where('ticket.id = :id', { id: id })
              .leftJoinAndSelect('ticket.commentId', 'commentId')
              .leftJoinAndSelect('ticket.originalNewsId', 'originalNewsId')
              .getOne();
    }
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepository.findOneBy({ id: id });
    let comment = await this.commentRepository.findOneBy({
      body: updateTicketDto.description
    });
    switch (updateTicketDto.status) {
      case TicketStatus.ACCEPTED:
        ticket.status = TicketStatus.ACCEPTED;
        break;
      case TicketStatus.REJECTED:
        ticket.status = TicketStatus.REJECTED;
        break;
      case TicketStatus.PENDING:
        ticket.status = TicketStatus.PENDING;
        break;
      default:
        ticket.status = TicketStatus.PENDING;
        break;
    }
    if (comment !== null) {
      ticket.commentId = comment;
    } else {
      comment = this.commentRepository.create();
      comment.body = updateTicketDto.description;
      ticket.commentId = await this.commentRepository.save(comment);
    }
    switch (ticket.itemType) {
      case TicketType.EXERCISE:
        ticket.originalExerciseId = await this.excerciseRepository.findOneBy({
          id: updateTicketDto.originalExerciseId
        });
        ticket.modifiedExerciseId = await this.excerciseRepository.findOneBy({
          id: updateTicketDto.modifiedExerciseId
        });
        break;
      case TicketType.NOTE:
        ticket.originalNoteId = await this.notesRepository.findOneBy({
          id: updateTicketDto.originalNoteId
        });
        ticket.modifiedNoteId = await this.notesRepository.findOneBy({
          id: updateTicketDto.modifiedNoteId
        });
        break;
      case TicketType.NEWS:
        ticket.originalNewsId = await this.newsRepository.findOneBy({
          id: updateTicketDto.originalNewsId
        });
        ticket.modifiedNewsId = await this.newsRepository.findOneBy({
          id: updateTicketDto.modifiedNewsId
        });
        break;
    }
    return await this.ticketRepository.save(ticket);
  }

  async remove(id: string) {
    const ticket = await this.ticketRepository.findOneBy({ id: id });
    return await this.ticketRepository.remove(ticket);
  }

  async approve(id: string) {
    const ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.id = :id', { id })
      .leftJoinAndSelect('ticket.originalExerciseId', 'originalExerciseId')
      .leftJoinAndSelect('ticket.modifiedExerciseId', 'modifiedExerciseId')
      .leftJoinAndSelect('ticket.originalNoteId', 'originalNoteId')
      .leftJoinAndSelect('ticket.modifiedNoteId', 'modifiedNoteId')
      .leftJoinAndSelect('ticket.originalNewsId', 'originalNewsId')
      .leftJoinAndSelect('ticket.modifiedNewsId', 'modifiedNewsId')
      .getOne();
    ticket.status = TicketStatus.ACCEPTED;
    this.ticketRepository.save(ticket);
    let res;
    let item: Excercise | Note | News;
    switch (ticket.operation) {
      case TicketOperation.CREATE:
        switch (ticket.itemType) {
          case TicketType.EXERCISE:
            item = await this.excerciseRepository.findOneBy({
              id: ticket.originalExerciseId.id
            });
            item.isVisible = true;
            res = await this.excerciseRepository.save(item);
            break;
          case TicketType.NOTE:
            item = await this.notesRepository.findOneBy({
              id: ticket.originalNoteId.id
            });
            item.isVisible = true;
            res = await this.notesRepository.save(item);
            break;
          case TicketType.NEWS:
            item = await this.newsRepository.findOneBy({
              id: ticket.originalNewsId.id
            });
            item.isVisible = true;
            res = await this.newsRepository.save(item);
            break;
        }
        break;
      case TicketOperation.UPDATE:
        let original: Excercise | Note | News;
        let modified: Excercise | Note | News;
        switch (ticket.itemType) {
          case TicketType.EXERCISE:
            original = await this.excerciseRepository.findOneBy({
              id: ticket.originalExerciseId.id
            });
            modified = await this.excerciseRepository.findOneBy({
              id: ticket.modifiedExerciseId.id
            });
            modified.isVisible = true;
            res = await this.excerciseRepository.save(modified);
            this.excerciseRepository.remove(original);
            break;
          case TicketType.NOTE:
            original = await this.notesRepository.findOneBy({
              id: ticket.originalNoteId.id
            });
            modified = await this.notesRepository.findOneBy({
              id: ticket.modifiedNoteId.id
            });
            modified.isVisible = true;
            res = await this.notesRepository.save(modified);
            this.notesRepository.remove(original);
            break;
          case TicketType.NEWS:
            original = await this.newsRepository.findOneBy({
              id: ticket.originalNewsId.id
            });
            modified = await this.newsRepository.findOneBy({
              id: ticket.modifiedNewsId.id
            });
            modified.isVisible = true;
            res = await this.newsRepository.save(modified);
            this.newsRepository.delete(original);
            break;
        }
        break;
      case TicketOperation.DELETE:
        switch (ticket.itemType) {
          case TicketType.EXERCISE:
            item = await this.excerciseRepository.findOneBy({
              id: ticket.originalExerciseId.id
            });
            res = await this.excerciseRepository.remove(item);
            break;
          case TicketType.NOTE:
            item = await this.notesRepository.findOneBy({
              id: ticket.originalNoteId.id
            });
            res = await this.notesRepository.remove(item);
            break;
          case TicketType.NEWS:
            item = await this.newsRepository.findOneBy({
              id: ticket.originalNewsId.id
            });
            res = await this.newsRepository.remove(item);
            break;
        }
        break;
    }
    return res;
  }

  async reject(id: string) {
    const ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .where('ticket.id = :id', { id })
      .leftJoinAndSelect('ticket.originalExerciseId', 'originalExerciseId')
      .leftJoinAndSelect('ticket.modifiedExerciseId', 'modifiedExerciseId')
      .leftJoinAndSelect('ticket.originalNoteId', 'originalNoteId')
      .leftJoinAndSelect('ticket.modifiedNoteId', 'modifiedNoteId')
      .leftJoinAndSelect('ticket.originalNewsId', 'originalNewsId')
      .leftJoinAndSelect('ticket.modifiedNewsId', 'modifiedNewsId')
      .getOne();

    ticket.status = TicketStatus.REJECTED;
    const res = await this.ticketRepository.save(ticket);
    let item: Excercise | Note | News;
    switch (ticket.operation) {
      case TicketOperation.CREATE:
        switch (ticket.itemType) {
          case TicketType.EXERCISE:
            item = await this.excerciseRepository.findOneBy({
              id: ticket.originalExerciseId.id
            });
            await this.excerciseRepository.remove(item);
            break;
          case TicketType.NOTE:
            item = await this.notesRepository
              .createQueryBuilder('note')
              .leftJoinAndSelect('note.commentId', 'commentId')
              .where('note.id = :id', { id: ticket.originalNoteId.id })
              .getOne();
            const comment = await this.commentRepository
              .createQueryBuilder('comment')
              .leftJoinAndSelect('comment.notes', 'notes')
              .where('comment.id = :id', { id: item.commentId.id })
              .getOne();
            if (comment.notes.length === 1) {
              item.commentId = null;
              await this.notesRepository.save(item);
              await this.commentRepository.remove(comment);
            }
            await this.notesRepository.remove(item);
            break;
          case TicketType.NEWS:
            item = await this.newsRepository
              .createQueryBuilder('news')
              .where('news.id = :id', { id: ticket.originalNewsId.id })
              .leftJoinAndSelect('news.imageId', 'imageId')
              .getOne();
            const image = await this.imageRepository.findOneBy({
              id: item.imageId.id
            });
            if (image.news) {
              await this.imageRepository.remove(image);
            }
            await this.newsRepository.remove(item);
            break;
        }
        break;
      case TicketOperation.UPDATE:
        switch (ticket.itemType) {
          case TicketType.EXERCISE:
            item = await this.excerciseRepository.findOneBy({
              id: ticket.modifiedExerciseId.id
            });
            await this.excerciseRepository.remove(item);
            break;
          case TicketType.NOTE:
            item = await this.notesRepository.findOneBy({
              id: ticket.modifiedNoteId.id
            });
            await this.notesRepository.remove(item);
            break;
          case TicketType.NEWS:
            item = await this.newsRepository.findOneBy({
              id: ticket.modifiedNewsId.id
            });
            await this.newsRepository.remove(item);
            break;
        }
        break;
    }
    return res;
  }

  async hasPendingTicket(
    itemId: string,
    itemType: TicketType
  ): Promise<boolean> {
    const pendingTicket = await this.ticketRepository.findOne({
      where: {
        itemType,
        status: TicketStatus.PENDING,
        originalExerciseId:
          itemType === TicketType.EXERCISE ? { id: itemId } : undefined,
        originalNoteId:
          itemType === TicketType.NOTE ? { id: itemId } : undefined,
        originalNewsId:
          itemType === TicketType.NEWS ? { id: itemId } : undefined
      }
    });

    return !!pendingTicket;
  }
}