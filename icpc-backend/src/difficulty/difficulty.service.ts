import { Injectable } from '@nestjs/common';
import { CreateDifficultyDto } from './dto/create-difficulty.dto';
import { UpdateDifficultyDto } from './dto/update-difficulty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Difficulty } from './entities/difficulty.entity';

@Injectable()
export class DifficultyService {
  constructor(
    @InjectRepository(Difficulty)
    private readonly difficultyRepository: Repository<Difficulty>
  ) {}

  async create(createDifficultyDto: CreateDifficultyDto) {
    return await this.difficultyRepository.save(createDifficultyDto);
  }

  async findAll() {
    return await this.difficultyRepository
      .createQueryBuilder('difficulty')
      .orderBy('difficulty.level', 'ASC')
      .getMany();
  }

  async findOne(id: string) {
    return await this.difficultyRepository.findOneBy({ id });
  }

  async update(id: string, updateDifficultyDto: UpdateDifficultyDto) {
    const difficulty = await this.difficultyRepository.findOneBy({ id });
    return await this.difficultyRepository.save({
      ...difficulty,
      ...updateDifficultyDto
    });
  }

  async remove(id: string) {
    const difficulty = await this.difficultyRepository.findOneBy({ id });
    return await this.difficultyRepository.remove(difficulty);
  }
}
