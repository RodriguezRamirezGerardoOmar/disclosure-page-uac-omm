import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Comment } from '../comment/entities/comment.entity';
import {
  Ticket,
  TicketOperation,
  TicketStatus,
  TicketType
} from 'src/ticket/entities/ticket.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    @InjectRepository(Excercise)
    private readonly excerciseRepository: Repository<Excercise>
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const name = await this.findOneByName(createCategoryDto.name); // check if name exists
    if (name !== null) {
      throw new BadRequestException('Category already exists');
    }
    let comment = await this.commentRepository.findOneBy({
      body: createCategoryDto.commentId
    });
    if (comment === null) {
      comment = this.commentRepository.create({
        body: createCategoryDto.commentId
      });
    }
    const newCategory = this.categoryRepository.create(createCategoryDto);
    newCategory.comment = comment;
    const category = await this.categoryRepository.save(newCategory);
    const ticketCommentBody = `La categoría ${category.name} ha sido creada`;
    const ticketComment = this.commentRepository.create({
      body: ticketCommentBody
    });
    const ticketCommentId = await this.commentRepository.save(ticketComment);
    const ticket = this.ticketRepository.create({
      operation: TicketOperation.CREATE,
      status: TicketStatus.ACCEPTED,
      itemType: TicketType.UTILS,
      commentId: ticketCommentId
    });
    const savedTicket = await this.ticketRepository.save(ticket);
    if (category && savedTicket) {
      return {
        id: category.id,
        name: category.name,
        commentId: comment
      };
    } else {
      throw new BadRequestException('Error al crear la categoría');
    }
  }

  async findAll() {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .orderBy('category.name', 'ASC')
      .getMany();
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async findOneByName(name: string) {
    if (!name) {
      return null; // return null if name is not provided
    }
    const category = await this.categoryRepository // find the category in the 'category' table by the name
      .createQueryBuilder('category')
      .leftJoinAndSelect('comment', 'comment') // join the 'categories' table to the 'comments' table
      .where('category.name = :name', { name }) // find the category by name
      .getMany();
    if (category.length === 0) {
      return null; // return null if category doesn't exist
    }
    return category[0]; // return the category object
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: string) {
    const category = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.excercises', 'excercises')
      .leftJoinAndSelect('category.notes', 'notes')
      .where('category.id = :id', { id })
      .getOne();
    const ticketCommentBody = `La categoría ${category.name} ha sido eliminada`;
    const ticketComment = this.commentRepository.create({
      body: ticketCommentBody
    });
    const ticketCommentId = await this.commentRepository.save(ticketComment);
    const ticket = this.ticketRepository.create({
      operation: TicketOperation.DELETE,
      status: TicketStatus.ACCEPTED,
      itemType: TicketType.UTILS,
      commentId: ticketCommentId
    });
    const savedTicket = await this.ticketRepository.save(ticket);
    const categories = await this.categoryRepository.find({});
    let pivot = categories[0];
    if (pivot.id === category.id) {
      pivot = categories[1];
    }
    if (savedTicket) {
      if (categories.length === 1) {
        throw new BadRequestException(
          'No se puede eliminar la única categoría'
        );
      } else {
        if (category.excercises.length > 0) {
          for (const exercise of category.excercises) {
            exercise.category = pivot;
            await this.excerciseRepository.save(exercise);
          }
        }
        if (category.notes.length > 0) {
          for (const note of category.notes) {
            note.category = pivot;
            await this.notesRepository.save(note);
          }
        }
        return await this.categoryRepository.remove(category);
      }
    }
  }
}
