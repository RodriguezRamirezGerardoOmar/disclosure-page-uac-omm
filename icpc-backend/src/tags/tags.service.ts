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
    const name = await this.tagRepository.findOneBy({
      name: createTagDto.name
    });
    if (name) {
      throw new BadRequestException('Ya existe una etiqueta con ese nombre.');
    }
    const existingTag = await this.tagRepository.findOneBy({
      color: createTagDto.color
    });
    if (existingTag) {
      throw new BadRequestException('Ya existe una etiqueta con este color.');
    }

    const savedTag = await this.tagRepository.save(createTagDto);
    if (savedTag) {
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
        return savedTag;
      }
    } else {
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
    const existingTag = await this.tagRepository.findOneBy({
      name: updateTagDto.name
    });
    if (existingTag !== null && existingTag.name !== existingTag.name) {
      throw new BadRequestException('Ya existe una etiqueta con ese nombre.');
    }
    const existingColorTag = await this.tagRepository.findOneBy({
      color: updateTagDto.color
    });
    if (existingColorTag && existingColorTag.id !== id) {
      throw new BadRequestException('Ya existe una etiqueta con este color');
    }

    const tag = await this.tagRepository.findOneBy({ id });
    const savedTag = await this.tagRepository.save({ ...tag, ...updateTagDto });
    if (savedTag) {
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
        return savedTag;
      }
    } else {
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
        for (const exercise of tag.excercises) {
          exercise.tags = exercise.tags.filter(t => t.id !== id);
          if (exercise.tags.length === 0) {
            exercise.tags.push(pivot);
          }
          await this.excerciseRepository.save(exercise);
        }
      }
      if (tag.notes.length > 0) {
        for (const note of tag.notes) {
          note.tags = note.tags.filter(t => t.id !== id);
          if (note.tags.length === 0) {
            note.tags.push(pivot);
          }
          await this.noteRepository.save(note);
        }
      }
      return await this.tagRepository.remove(tag);
    } else {
      throw new BadRequestException('Error al eliminar la etiqueta');
    }
  }
}
