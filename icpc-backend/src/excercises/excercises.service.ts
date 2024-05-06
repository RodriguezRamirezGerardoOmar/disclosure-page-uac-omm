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
    const { name, categoryId, difficultyId, timeId, memoryId } =
      createExcerciseDto;
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
    return await this.excerciseRepository.find();
  }

  async findOne(id: string) {
    return await this.excerciseRepository.findBy({ id });
  }

  async findOneByName(name: string) {
    return await this.excerciseRepository.findOneBy({ name });
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
