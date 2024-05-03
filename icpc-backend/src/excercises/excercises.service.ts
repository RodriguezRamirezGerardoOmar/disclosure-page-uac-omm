import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
    private readonly tagRepository: Repository<Tag>
  ) {}

  async create(createExcerciseDto: CreateExcerciseDto) {
    const {
      name,
      categoryId,
      difficultyId,
      timeId,
      memoryId,
      input,
      output,
      constraints,
      clue,
      tags,
      author,
      description,
      example_input,
      example_output
    } = createExcerciseDto;
    const newExcerciseName = await this.excerciseRepository.findOneBy({
      name: name
    });
    if (newExcerciseName !== null) {
      throw new BadRequestException(
        'Un ejercicio con el mismo nombre ya existe'
      );
    }
    const newExcerciseCategory = await this.categoryRepository.findOneBy({
      name: categoryId
    });
    if (newExcerciseCategory === null) {
      throw new BadRequestException('La categoría no existe');
    }
    const newExcerciseDifficulty = await this.difficultyRepository.findOneBy({
      name: difficultyId
    });
    if (newExcerciseDifficulty === null) {
      throw new BadRequestException('El nivel de dificultad elegido no existe');
    }
    const newExcerciseTime = await this.timeRepository.findOneBy({
      timeLimit: timeId
    });
    if (newExcerciseTime === null) {
      throw new BadRequestException('El límite de tiempo elegido no existe');
    }
    const newExcerciseMemory = await this.memoryRepository.findOneBy({
      memoryLimit: memoryId
    });
    if (newExcerciseMemory === null) {
      throw new BadRequestException('El límite de memoria elegido no existe');
    }
    const newExcercise = this.excerciseRepository.create(createExcerciseDto);
    newExcercise.category = newExcerciseCategory;
    newExcercise.difficulty = newExcerciseDifficulty;
    newExcercise.time = newExcerciseTime;
    const response = await this.excerciseRepository.save(newExcercise);
    return response;
  }

  async findAll() {
    return `This action returns all excercises`;
  }

  async findOne(id: string) {
    return `This action returns a #${id} excercise`;
  }

  async findOneByName(name: string) {
    return await this.excerciseRepository.findOneBy({ name });
  }

  async update(id: string, updateExcerciseDto: UpdateExcerciseDto) {
    return `This action updates a #${id} excercise`;
  }

  async remove(id: string) {
    return `This action removes a #${id} excercise`;
  }
}
