import { Injectable } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { Time } from './entities/time.entity';

@Injectable()
export class TimeService {
  constructor(
    @InjectRepository(Time)
    private readonly timeRepository: Repository<Time>
  ) {}

  async create(createTimeDto: CreateTimeDto) {
    const newVal = await this.timeRepository.save(createTimeDto);
    return {
      id: newVal.id,
      timeLimit: newVal.timeLimit
    };
  }

  async findAll() {
    return await this.timeRepository
      .createQueryBuilder('time')
      .orderBy('time.timeLimit', 'ASC')
      .getMany();
  }

  async findOne(id: string) {
    return await this.timeRepository.findOneBy({ id });
  }

  async findOneByValue(value: number) {
    if (!value) {
      return null; // return null if value is not provided
    } else {
      const category = await this.timeRepository.findOneBy({
        timeLimit: value
      });
      if (!category) {
        return null; // return null if category doesn't exist
      } else return category;
    }
  }

  async update(id: string, updateTimeDto: UpdateTimeDto) {
    const time = await this.timeRepository.findOneBy({ id });
    return await this.timeRepository.save({ ...time, ...updateTimeDto });
  }

  async remove(id: string) {
    const time = await this.timeRepository.findOneBy({ id });
    return await this.timeRepository.remove(time);
  }
}
