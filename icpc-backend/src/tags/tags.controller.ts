import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LoggerService } from 'src/services/logger.service';
 
/*
Input:
  - create: createTagDto (tag data), req (authenticated user)
  - findAll: none
  - findOne: id (string)
  - update: id (string), updateTagDto (fields to update), req (authenticated user)
  - remove: id (string), req (authenticated user)
Output:
  - create: Created tag
  - findAll: List of tags
  - findOne: Found tag
  - update: Updated tag
  - remove: Deleted tag
Return value: Tags controller with endpoints to create, retrieve, update, and delete tags
Function: Handles CRUD operations for tags, with authentication protection and change logging
Variables: tagsService, loggerService
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Endpoints:
- POST /tags
  Description: Creates a new tag
  Permission: USER (authentication required)
  Input: createTagDto
  Output: Created tag

- GET /tags
  Description: Retrieves all tags
  Permission: Public
  Output: List of tags

- GET /tags/:id
  Description: Retrieves a tag by id
  Permission: Public
  Output: Found tag

- PATCH /tags/:id
  Description: Updates a tag by id
  Permission: USER (authentication required)
  Input: updateTagDto
  Output: Updated tag

- DELETE /tags/:id
  Description: Deletes a tag by id
  Permission: USER (authentication required)
  Output: Deleted tag
*/

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly loggerService: LoggerService
  ) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The tag has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() createTagDto: CreateTagDto, @Req() req: any) {
    const newTag = await this.tagsService.create(createTagDto);
    this.loggerService.logChange('tags', 'create', req.user.name, newTag.id);
    return newTag;
  }

  @Get()
  @ApiResponse({
    description: 'The tag list has been successfully retrieved.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAll() {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    description: 'The tag has been successfully retrieved.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The tag has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
    @Req() req: any
  ) {
    const modifiedTag = await this.tagsService.update(id, updateTagDto);
    this.loggerService.logChange(
      'tags',
      'update',
      req.user.name,
      modifiedTag.id
    );
    return modifiedTag;
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The tag has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async remove(@Param('id') id: string, @Req() req: any) {
    const deletedTag = await this.tagsService.remove(id);
    this.loggerService.logChange('tags', 'delete', req.user.name, id);
    return deletedTag;
  }
}
