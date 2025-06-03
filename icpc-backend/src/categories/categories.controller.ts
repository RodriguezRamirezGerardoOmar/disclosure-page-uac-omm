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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LoggerService } from 'src/services/logger.service';

/*
Input:
  - create: createCategoryDto (category data), req (authenticated user)
  - findAll: none
  - findOne: id (string)
  - update: id (string), updateCategoryDto (fields to update), req (authenticated user)
  - remove: id (string), req (authenticated user)
Output:
  - create: Created category
  - findAll: List of categories
  - findOne: Found category
  - update: Updated category
  - remove: Deleted category
Return value: Categories controller with endpoints to create, retrieve, update, and delete categories
Function: Handles CRUD operations for categories, with change logging and authentication protection
Variables: categoriesService, loggerService
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Endpoints:
- POST /categories
  Description: Creates a new category
  Permission: USER (authentication required)
  Input: createCategoryDto
  Output: Created category

- GET /categories
  Description: Retrieves all categories
  Permission: Public
  Output: List of categories

- GET /categories/:id
  Description: Retrieves a category by id
  Permission: Public
  Output: Found category

- PATCH /categories/:id
  Description: Updates an existing category
  Permission: USER (authentication required)
  Input: updateCategoryDto
  Output: Updated category

- DELETE /categories/:id
  Description: Deletes an existing category
  Permission: USER (authentication required)
  Output: Deleted category
*/

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly loggerService: LoggerService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The note has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: any) {
    const newCategory = await this.categoriesService.create(createCategoryDto);
    this.loggerService.logChange(
      'categories',
      'create',
      req.user.name,
      newCategory.id
    );
    return newCategory;
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The note has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Req() req: any
  ) {
    const modifiedCategory = await this.categoriesService.update(
      id,
      updateCategoryDto
    );
    this.loggerService.logChange(
      'categories',
      'update',
      req.user.name,
      modifiedCategory.id
    );
    return modifiedCategory;
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The note has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async remove(@Param('id') id: string, @Req() req: any) {
    const deletedCategory = await this.categoriesService.remove(id);
    this.loggerService.logChange('categories', 'delete', req.user.name, id);
    return deletedCategory;
  }
}
