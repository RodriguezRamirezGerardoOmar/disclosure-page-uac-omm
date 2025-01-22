import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Excercise } from 'src/excercises/entities/excercise.entity';
import { Category } from './entities/category.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Note } from 'src/notes/entities/note.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Excercise, Comment, Ticket, Note])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService]
})
export class CategoriesModule {}
