import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const body = await this.findOneByBody(createCommentDto.body); // check if body exists
    if (body !== null) {
      return {
        message: 'Comment already exists'
      };
    }
    const comment = this.commentRepository.create(createCommentDto); // create comment object
    const newComment = await this.commentRepository.save(comment); // save the comment object to the database
    return {
      // return the comment object
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
