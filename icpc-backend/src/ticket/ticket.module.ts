import { Module } from '@nestjs/common';
import { Ticket } from './entities/ticket.entity';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Note } from 'src/notes/entities/note.entity';
import { News } from 'src/news/entities/news.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Image } from 'src/image/entities/image.entity';
import { LoggerService } from 'src/services/logger.service';

/*
Ticket module: configures the integration of the Ticket entity and related services for managing tickets, exercises, notes, news, comments, and images. Exposes the ticket service and uses TypeORM for persistence.
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, Excercise, Note, News, Comment, Image])
  ],
  controllers: [TicketController],
  providers: [TicketService, LoggerService],
  exports: [TicketService]
})
export class TicketModule {}
