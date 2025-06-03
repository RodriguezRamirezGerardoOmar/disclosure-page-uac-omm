import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Note } from 'src/notes/entities/note.entity';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { LoggerService } from 'src/services/logger.service';

/*
Tags module: configures the integration of the Tag entity and related services for managing tags, comments, tickets, notes, and exercises. Exposes the tags service and uses TypeORM for persistence.
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Comment, Ticket, Note, Excercise])],
  controllers: [TagsController],
  providers: [TagsService, LoggerService],
  exports: [TagsService]
})
export class TagsModule {}
