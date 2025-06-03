import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Category } from './entities/category.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Note } from 'src/notes/entities/note.entity';
import { LoggerService } from 'src/services/logger.service';

/*
Categories module: configures the integration of entities and services for managing categories, exercises, comments, tickets, and notes. Exposes the categories service and uses TypeORM for persistence.
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Excercise, Comment, Ticket, Note])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, LoggerService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
