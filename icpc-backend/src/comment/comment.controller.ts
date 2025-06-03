import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

/*
Input:
  - create: createCommentDto (comment content)
  - findAll: none
  - findOne: id (string)
  - update: id (string), updateCommentDto (fields to update)
  - remove: id (string)
Output:
  - create: Created comment
  - findAll: List of comments
  - findOne: Found comment
  - update: Updated comment
  - remove: Deleted comment
Return value: Comment controller with endpoints to create, retrieve, update, and delete comments
Function: Handles CRUD operations for comments
Variables: commentService
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Endpoints:
- POST /comment
  Description: Creates a new comment
  Permission: USER (authentication required)
  Input: createCommentDto
  Output: Created comment

- GET /comment
  Description: Retrieves all comments
  Permission: Public
  Output: List of comments

- GET /comment/:id
  Description: Retrieves a comment by id
  Permission: Public
  Output: Found comment

- PATCH /comment/:id
  Description: Updates an existing comment
  Permission: USER (authentication required)
  Input: updateCommentDto
  Output: Updated comment

- DELETE /comment/:id
  Description: Deletes an existing comment
  Permission: USER (authentication required)
  Output: Deleted comment
*/

@Controller('comment')
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The comment has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The comment has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The comment has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
