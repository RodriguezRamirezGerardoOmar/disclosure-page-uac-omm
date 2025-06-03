import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Category } from 'src/categories/entities/category.entity';

/*
Comments module: configures the integration of entities and services for managing comments and their relation to categories. Exposes the comment service and uses TypeORM for persistence.
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Category])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService]
})
export class CommentModule {}
