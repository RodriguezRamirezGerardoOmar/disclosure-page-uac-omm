import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Category } from '../categories/entities/category.entity';
import { Comment } from '../comment/entities/comment.entity';
import { CommentService } from 'src/comment/comment.service';
import { Tag } from 'src/tags/entities/tag.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { User } from 'src/users/entities/user.entity';
import { LoggerService } from '../services/logger.service'; // Importa el LoggerService

@Module({
  imports: [
    TypeOrmModule.forFeature([Note, Category, Comment, Ticket, User, Tag])
  ],
  controllers: [NotesController],
  providers: [NotesService, CommentService, LoggerService], // Añade LoggerService a los proveedores
  exports: [NotesService]
})
export class NotesModule {}