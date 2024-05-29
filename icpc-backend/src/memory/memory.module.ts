import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryController } from './memory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memory } from './entities/memory.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Memory, Excercise])],
  controllers: [MemoryController],
  providers: [MemoryService],
  exports: [MemoryService]
})
export class MemoryModule {}
