import { Injectable } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './entities/memory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory)
    private readonly memoryRepository: Repository<Memory>
  ) {}

  async create(createMemoryDto: CreateMemoryDto) {
    const newVal = await this.memoryRepository.save(createMemoryDto);
    return {
      id: newVal.id,
      memoryLimit: newVal.memoryLimit
    };
  }

  async findAll() {
    return await this.memoryRepository.find();
  }

  async findOne(id: string) {
    return await this.memoryRepository.findOneBy({ id });
  }

  async update(id: string, updateMemoryDto: UpdateMemoryDto) {
    const memory = await this.memoryRepository.findOneBy({ id });
    return await this.memoryRepository.save({ ...memory, ...updateMemoryDto });
  }

  async remove(id: string) {
    const memory = await this.memoryRepository.findOneBy({ id });
    return await this.memoryRepository.remove(memory);
  }
}
