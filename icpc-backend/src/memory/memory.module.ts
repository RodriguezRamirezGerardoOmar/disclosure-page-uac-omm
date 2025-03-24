import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryController } from './memory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Memory } from './entities/memory.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { LoggerService } from 'src/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Memory, Excercise, Comment, Ticket])],
  controllers: [MemoryController],
  providers: [MemoryService, LoggerService],
  exports: [MemoryService]
})
export class MemoryModule {}
