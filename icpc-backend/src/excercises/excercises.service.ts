import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { Repository } from 'typeorm';
import { Memory } from 'src/memory/entities/memory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Excercise } from './entities/excercise.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
import { Time } from 'src/time/entities/time.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import {
  Ticket,
  TicketOperation,
  TicketStatus,
  TicketType
} from 'src/ticket/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class ExcercisesService {
  constructor(
    @InjectRepository(Excercise)
    private readonly excerciseRepository: Repository<Excercise>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Difficulty)
    private readonly difficultyRepository: Repository<Difficulty>,
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>,
    @InjectRepository(Memory)
    private readonly memoryRepository: Repository<Memory>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async create(createExcerciseDto: CreateExcerciseDto) {
    const { title, category, difficulty, time, memoryId } = createExcerciseDto;
    const newExcerciseName = await this.excerciseRepository.findOneBy({
      title: title
    });
    if (newExcerciseName !== null) {
      throw new BadRequestException(
        'Un ejercicio con el mismo nombre ya existe'
      );
    }
    const newExcerciseCategory = await this.categoryRepository.findOneBy({
      name: category.name,
      id: category.id
    });
    if (newExcerciseCategory === null) {
      throw new BadRequestException('La categoría no existe');
    }
    const newExcerciseDifficulty = await this.difficultyRepository.findOneBy({
      name: difficulty.name
    });
    if (newExcerciseDifficulty === null) {
      throw new BadRequestException('El nivel de dificultad elegido no existe');
    }
    const newExcerciseTime = await this.timeRepository.findOneBy({
      timeLimit: time.value,
      id: time.id
    });
    if (newExcerciseTime === null) {
      throw new BadRequestException('El límite de tiempo elegido no existe');
    }
    const newExcerciseMemory = await this.memoryRepository.findOneBy({
      id: memoryId
    });
    if (newExcerciseMemory === null) {
      throw new BadRequestException('El límite de memoria elegido no existe');
    }
    const newExcercise = this.excerciseRepository.create({
      ...createExcerciseDto,
      memoryId: newExcerciseMemory
    });
    newExcercise.category = newExcerciseCategory;
    newExcercise.difficulty = newExcerciseDifficulty;
    newExcercise.time = newExcerciseTime;
    const user = await this.userRepository.findOneBy({
      userName: createExcerciseDto.userAuthor
    });
    newExcercise.created_by = user.name;
    newExcercise.isVisible = createExcerciseDto.role === 'admin';
    const savedExcercise = await this.excerciseRepository.save(newExcercise);
    const commentBody = `${user.name} ha creado un nuevo ejercicio con el nombre ${newExcercise.title}`;
    const comment = this.commentRepository.create({
      body: commentBody
    });
    const commentId = await this.commentRepository.save(comment);
    const ticket = this.ticketRepository.create({
      itemType: TicketType.EXERCISE,
      operation: TicketOperation.CREATE,
      status:
        createExcerciseDto.role === 'admin'
          ? TicketStatus.ACCEPTED
          : TicketStatus.PENDING,
      originalExerciseId: savedExcercise,
      commentId: commentId
    });
    const savedTicket = await this.ticketRepository.save(ticket);
    if (savedExcercise && savedTicket) {
      return savedExcercise;
    } else {
      throw new BadRequestException('Error al crear el ejercicio');
    }
  }

  async findAll() {
    return await this.excerciseRepository.find();
  }

  async findOne(id: string) {
    return await this.excerciseRepository.findBy({ id });
  }

  async findOneByName(name: string) {
    return await this.excerciseRepository.findOneBy({ title: name });
  }

  async update(id: string, updateExcerciseDto: UpdateExcerciseDto) {
    const excercise = await this.excerciseRepository.findOneBy({ id });
    return await this.memoryRepository.save({
      ...excercise,
      ...updateExcerciseDto
    });
  }

  async remove(id: string) {
    const excercise = await this.excerciseRepository.findOneBy({ id });
    return await this.excerciseRepository.remove(excercise);
  }
}
