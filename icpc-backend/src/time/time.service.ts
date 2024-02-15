import { Injectable } from '@nestjs/common';
import { CreateTimeDto } from './dto/create-time.dto';
import { UpdateTimeDto } from './dto/update-time.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return await this.timeRepository.find();
  }

  async findOne(id: string) {
    return await this.timeRepository.findOneBy({ id });
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
