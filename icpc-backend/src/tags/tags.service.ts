import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import {
  Ticket,
  TicketOperation,
  TicketStatus,
  TicketType
} from 'src/ticket/entities/ticket.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Note } from 'src/notes/entities/note.entity';

  /*
  Input:
    - create: createTagDto (tag data)
    - findAll: none
    - findOne: id (string)
    - update: id (string), updateTagDto (fields to update)
    - remove: id (string)
  Output:
    - create: Created tag object or error
    - findAll: List of all tags
    - findOne: Found tag or null
    - update: Updated tag or error
    - remove: Deleted tag or error
  Return value: Service providing business logic and data access for tags, including creation, retrieval, update, and deletion
  Function: Handles all CRUD operations for tags, manages the Tag entity, and integrates with related entities (comments, tickets, exercises, notes) for persistence and business logic
  Variables: tagRepository, commentRepository, ticketRepository, excerciseRepository, noteRepository
  Date: 02 - 06 - 2025
  Author: Alan Julian Itzamna Mier Cupul
  */

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Excercise)
    private readonly excerciseRepository: Repository<Excercise>,
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>
  ) {}

  async create(createTagDto: CreateTagDto) {
    const trimmedName = createTagDto.name.trim();
    // If the trimmed name is empty, throw an exception
    if (trimmedName.length === 0) {
      throw new BadRequestException(
        'El nombre de la etiqueta no puede estar vacío o contener solo espacios.'
      );
    }

    // If the trimmed name exceeds 255 characters, throw an exception
    if (trimmedName.length > 255) {
      throw new BadRequestException(
        'El nombre de la etiqueta no puede exceder los 255 caracteres.'
      );
    }

    // If a tag with the same name exists, throw an exception
    const name = await this.tagRepository.findOneBy({
      name: trimmedName
    });
    if (name) {
      throw new BadRequestException('Ya existe una etiqueta con ese nombre.');
    }

    // If a tag with the same color exists, throw an exception
    const existingTag = await this.tagRepository.findOneBy({
      color: createTagDto.color
    });
    if (existingTag) {
      throw new BadRequestException('Ya existe una etiqueta con este color.');
    }

    const savedTag = await this.tagRepository.save({
      ...createTagDto,
      name: trimmedName
    });
    if (savedTag) {
      // If the tag is saved, create a comment and ticket
      const ticketCommentBody = `La etiqueta ${savedTag.name} ha sido creada`;
      const comment = this.commentRepository.create({
        body: ticketCommentBody
      });
      const savedComment = await this.commentRepository.save(comment);
      const ticket = this.ticketRepository.create({
        otherId: savedTag.id,
        operation: TicketOperation.CREATE,
        status: TicketStatus.ACCEPTED,
        itemType: TicketType.UTILS,
        commentId: savedComment
      });
      await this.ticketRepository.save(ticket);
      if (savedComment && ticket) {
        // If both the comment and ticket are saved, return the tag
        return savedTag;
      }
    } else {
      // If the tag was not saved, throw an exception
      throw new BadRequestException('Error al crear la etiqueta');
    }
  }

  async findAll() {
    return await this.tagRepository
      .createQueryBuilder('tag')
      .orderBy('tag.name', 'ASC')
      .getMany();
  }

  async findOne(id: string) {
    return await this.tagRepository.findOneBy({ id });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const trimmedName = updateTagDto.name.trim();
    // If the trimmed name is empty, throw an exception
    if (trimmedName.length === 0) {
      throw new BadRequestException(
        'El nombre de la etiqueta no puede estar vacío o contener solo espacios.'
      );
    }

    // If the trimmed name exceeds 255 characters, throw an exception
    if (trimmedName.length > 255) {
      throw new BadRequestException(
        'El nombre de la etiqueta no puede exceder los 255 caracteres.'
      );
    }

    // If another tag with the same name exists, throw an exception
    const existingTag = await this.tagRepository.findOneBy({
      name: trimmedName
    });
    if (existingTag !== null && existingTag.id !== id) {
      throw new BadRequestException('Ya existe una etiqueta con ese nombre.');
    }

    // If another tag with the same color exists, throw an exception
    const existingColorTag = await this.tagRepository.findOneBy({
      color: updateTagDto.color
    });
    if (existingColorTag && existingColorTag.id !== id) {
      throw new BadRequestException('Ya existe una etiqueta con este color');
    }

    const tag = await this.tagRepository.findOneBy({ id });
    const savedTag = await this.tagRepository.save({
      ...tag,
      ...updateTagDto,
      name: trimmedName
    });
    if (savedTag) {
      // If the tag is saved, create a comment and ticket
      const ticketCommentBody = `La etiqueta ${savedTag.name} ha sido actualizada`;
      const comment = this.commentRepository.create({
        body: ticketCommentBody
      });
      const savedComment = await this.commentRepository.save(comment);
      const ticket = this.ticketRepository.create({
        otherId: savedTag.id,
        operation: TicketOperation.UPDATE,
        status: TicketStatus.ACCEPTED,
        itemType: TicketType.UTILS,
        commentId: savedComment
      });
      const savedTicket = await this.ticketRepository.save(ticket);
      if (savedComment && savedTicket) {
        // If both the comment and ticket are saved, return the tag
        return savedTag;
      }
    } else {
      // If the tag was not saved, throw an exception
      throw new BadRequestException('Error al actualizar la etiqueta');
    }
  }

  async remove(id: string) {
    const allTags = await this.tagRepository.find();
    if (allTags.length === 1) {
      throw new BadRequestException('No se puede eliminar la única etiqueta');
    }
    let pivot = allTags[0];
    if (pivot.id === id) {
      pivot = allTags[1];
    }
    const tag = await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.excercises', 'excercises')
      .leftJoinAndSelect('excercises.tags', 'exerciseTags')
      .leftJoinAndSelect('tag.notes', 'notes')
      .leftJoinAndSelect('notes.tags', 'noteTags')
      .where('tag.id = :id', { id: id })
      .getOne();
    const ticketCommentBody = `La etiqueta ${tag.name} ha sido eliminada`;
    const comment = this.commentRepository.create({ body: ticketCommentBody });
    const ticket = this.ticketRepository.create({
      operation: TicketOperation.DELETE,
      status: TicketStatus.ACCEPTED,
      itemType: TicketType.UTILS,
      commentId: comment
    });
    const savedTicket = await this.ticketRepository.save(ticket);
    if (savedTicket) {
      if (tag.excercises.length > 0) {
        // If the tag is associated with any exercises, update each exercise
        for (const exercise of tag.excercises) {
          // Remove the tag from the exercise's tags
          exercise.tags = exercise.tags.filter(t => t.id !== id);
          // If the exercise has no tags left, assign the pivot tag
          if (exercise.tags.length === 0) {
            exercise.tags.push(pivot);
          }
          await this.excerciseRepository.save(exercise);
        }
      }
      if (tag.notes.length > 0) {
        // If the tag is associated with any notes, update each note
        for (const note of tag.notes) {
          // Remove the tag from the note's tags
          note.tags = note.tags.filter(t => t.id !== id);
          // If the note has no tags left, assign the pivot tag
          if (note.tags.length === 0) {
            note.tags.push(pivot);
          }
          await this.noteRepository.save(note);
        }
      }
      return await this.tagRepository.remove(tag);
    } else {
      // If the ticket was not saved, throw an exception
      throw new BadRequestException('Error al eliminar la etiqueta');
    }
  }
}
