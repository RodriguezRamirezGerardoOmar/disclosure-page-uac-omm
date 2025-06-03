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

/*
Input:
  - create: createCategoryDto (category data)
  - findAll: none
  - findOne: id (string)
  - findOneByName: name (string)
  - update: id (string), updateCategoryDto (fields to update)
  - remove: id (string)
Output:
  - create: Created category or error
  - findAll: List of categories
  - findOne: Found category
  - findOneByName: Found category or null
  - update: Updated category or error
  - remove: Deleted category or error
Return value: Service for CRUD operations on categories, with validations and change logging via tickets and comments
Function: Handles business logic for creating, retrieving, updating, and deleting categories, ensuring integrity and traceability
Variables: categoryRepository, commentRepository, ticketRepository, notesRepository, excerciseRepository
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

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
    const trimmedName = createCategoryDto.name.trim();
    // Check if the trimmed name is empty
    if (trimmedName.length === 0) {
        // If the name is empty or only spaces, throw an exception
        throw new BadRequestException(
            'El nombre de la categoría no puede estar vacío o contener solo espacios.'
        );
    }
    // Check if the trimmed name exceeds 255 characters
    if (trimmedName.length > 255) {
        // If the name is too long, throw an exception
        throw new BadRequestException(
            'El nombre de la categoría no puede exceder los 255 caracteres.'
        );
    }

    // Check if a category with the same name already exists
    const name = await this.findOneByName(trimmedName); // check if name exists
    if (name !== null) {
        // If the category exists, throw an exception
        throw new BadRequestException('Esa categoría ya existe');
    }

    let comment = await this.commentRepository.findOneBy({
      body: createCategoryDto.commentId
    });
    // If the comment does not exist, create a new one
    if (comment === null) {
      comment = this.commentRepository.create({
        body: createCategoryDto.commentId
      });
    }

    const newCategory = this.categoryRepository.create({
      ...createCategoryDto,
      name: trimmedName
    });
    newCategory.comment = comment;
    const category = await this.categoryRepository.save(newCategory);
    const ticketCommentBody = `La categoría ${category.name} ha sido creada`;
    const ticketComment = this.commentRepository.create({
      body: ticketCommentBody
    });
    const ticketCommentId = await this.commentRepository.save(ticketComment);
    const ticket = this.ticketRepository.create({
      otherId: category.id,
      operation: TicketOperation.CREATE,
      status: TicketStatus.ACCEPTED,
      itemType: TicketType.UTILS,
      commentId: ticketCommentId
    });
    const savedTicket = await this.ticketRepository.save(ticket);
    if (category && savedTicket) {
      // If both category and ticket are saved, return the result
      return {
        id: category.id,
        name: category.name,
        commentId: comment
      };
    } else {
      // If not, throw an exception
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
    // If name is not provided, return null
    if (!name) {
      return null; // return null if name is not provided
    }
    const category = await this.categoryRepository // find the category in the 'category' table by the name
      .createQueryBuilder('category')
      .leftJoinAndSelect('comment', 'comment') // join the 'categories' table to the 'comments' table
      .where('category.name = :name', { name }) // find the category by name
      .getMany();
    if (category.length === 0) {
      // If no category is found, return null
      return null; // return null if category doesn't exist
    }
    return category[0]; // return the category object
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const trimmedName = updateCategoryDto.name.trim();
    // Check if the trimmed name is empty
    if (trimmedName.length === 0) {
        // If the name is empty or only spaces, throw an exception
        throw new BadRequestException(
            'El nombre de la categoría no puede estar vacío o contener solo espacios.'
        );
    }
    // Check if the trimmed name exceeds 255 characters
    if (trimmedName.length > 255) {
        // If the name is too long, throw an exception
        throw new BadRequestException(
            'El nombre de la categoría no puede exceder los 255 caracteres.'
        );
    }

    const category = await this.categoryRepository.findOneBy({ id });
    const existingCategory = await this.findOneByName(trimmedName);
    // Check if another category with the same name exists and is not the current one
    if (existingCategory !== null && existingCategory.id !== id) {
        // If another category exists with the same name, throw an exception
        throw new BadRequestException('Esa categoría ya existe');
    }

    const savedCategory = await this.categoryRepository.save({
      ...category,
      ...updateCategoryDto,
      name: trimmedName
    });
    if (savedCategory) {
      const ticketCommentBody = `La categoría ${savedCategory.name} ha sido actualizada`;
      const comment = this.commentRepository.create({
        body: ticketCommentBody
      });
      const savedComment = await this.commentRepository.save(comment);
      const ticket = this.ticketRepository.create({
        otherId: savedCategory.id,
        operation: TicketOperation.UPDATE,
        status: TicketStatus.ACCEPTED,
        itemType: TicketType.UTILS,
        commentId: savedComment
      });
      const savedTicket = await this.ticketRepository.save(ticket);
      if (savedComment && savedTicket) {
        // If both comment and ticket are saved, return the updated category
        return savedCategory;
      }
    }
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
      // If the first category is the one to be deleted, use the second as pivot
      pivot = categories[1];
    }
    if (savedTicket) {
      // If there is only one category, do not allow deletion
      if (categories.length === 1) {
        throw new BadRequestException(
          'No se puede eliminar la única categoría'
        );
      } else {
        // If the category has exercises, reassign them to the pivot category
        if (category.excercises.length > 0) {
          for (const exercise of category.excercises) {
            exercise.category = pivot;
            await this.excerciseRepository.save(exercise);
          }
        }
        // If the category has notes, reassign them to the pivot category
        if (category.notes.length > 0) {
          for (const note of category.notes) {
            note.category = pivot;
            await this.notesRepository.save(note);
          }
        }
        // Remove the category
        return await this.categoryRepository.remove(category);
      }
    }
  }
}