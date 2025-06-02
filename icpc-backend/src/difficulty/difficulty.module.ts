/*
Difficulty module: configures the integration of entities and services for managing difficulty levels, comments, tickets, and exercises. Exposes the difficulty service and uses TypeORM for persistence.
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

import { Module } from '@nestjs/common';
import { DifficultyService } from './difficulty.service';
import { DifficultyController } from './difficulty.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Difficulty } from './entities/difficulty.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { LoggerService } from 'src/services/logger.service';

@Module({
  imports: [TypeOrmModule.forFeature([Difficulty, Comment, Ticket, Excercise])],
  controllers: [DifficultyController],
  providers: [DifficultyService, LoggerService],
  exports: [DifficultyService]
})
export class DifficultyModule {}
