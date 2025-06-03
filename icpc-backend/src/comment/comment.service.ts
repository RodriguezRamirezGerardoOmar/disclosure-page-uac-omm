import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

/*
Input:
  - create: createCommentDto (comment content)
  - findAll: none
  - findOne: id (string)
  - findOneByBody: body (string)
Output:
  - create: Created comment or message if it already exists
  - findAll: List of comments
  - findOne: Found comment
  - findOneByBody: Found comment or null
Return value: Service for CRUD operations on comments
Function: Handles business logic for creating, retrieving, and searching comments, avoiding duplicates
Variables: commentRepository
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const body = await this.findOneByBody(createCommentDto.body);
    // If a comment with the same body already exists, return a message
    if (body !== null) {
      return {
        message: 'Comment already exists'
      };
    }
    const comment = this.commentRepository.create(createCommentDto); 
    const newComment = await this.commentRepository.save(comment);
    return {
      id: newComment.id,
      body: newComment.body
    };
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async findOne(id: string) {
    return await this.commentRepository.findOneBy({ id });
  }

  async findOneByBody(body: string) {
    return await this.commentRepository.findOneBy({ body });
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    return await this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: string) {
    const comment = await this.findOne(id);
    return await this.commentRepository.remove(comment);
  }
}
