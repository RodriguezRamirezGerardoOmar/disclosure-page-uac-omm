import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Req
} from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LoggerService } from '../services/logger.service'; 
import { ImageService } from 'src/image/image.service';
import { FileInterceptor } from '@nestjs/platform-express';

  /*
  Input:
    - create: createNewsDto (news data), req (authenticated user)
    - findAll: none
    - getCount: none
    - findOne: id (string)
    - search: query (string)
    - swapImage: id (string), file (Express.Multer.File)
    - update: id (string), updateNewsDto (fields to update), req (authenticated user)
    - remove: id (string), user (string), req (authenticated user)
  Output:
    - create: Created news item
    - findAll: List of news items
    - getCount: Number of news items
    - findOne: Found news item
    - search: List of news items matching the query
    - swapImage: Updated news item with new image
    - update: Updated news item
    - remove: Deleted news item
  Return value: News controller with endpoints to create, retrieve, update, delete, search, and swap images for news items
  Function: Handles CRUD operations, search, and image management for news items, with authentication protection and change logging
  Variables: imageService, newsService, loggerService
  Date: 02 - 06 - 2025
  Author: Alan Julian Itzamna Mier Cupul
  
  Endpoints:
  - POST /news
    Description: Creates a new news item
    Permission: USER (authentication required)
    Input: createNewsDto
    Output: Created news item
  
  - GET /news
    Description: Retrieves all news items
    Permission: Public
    Output: List of news items
  
  - GET /news/count
    Description: Retrieves the total number of news items
    Permission: Public
    Output: Number of news items
  
  - GET /news/:id
    Description: Retrieves a news item by id
    Permission: Public
    Output: Found news item
  
  - POST /news/search/:query
    Description: Searches news items by query
    Permission: Public
    Output: List of news items matching the query
  
  - PATCH /news/image/:id
    Description: Swaps the image of a news item
    Permission: USER (authentication required)
    Input: file (multipart/form-data)
    Output: Updated news item with new image
  
  - PATCH /news/:id
    Description: Updates an existing news item
    Permission: USER (authentication required)
    Input: updateNewsDto
    Output: Updated news item
  
  - DELETE /news/:id/:user
    Description: Deletes an existing news item
    Permission: USER (authentication required)
    Output: Deleted news item
  */

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(
    private readonly imageService: ImageService,
    private readonly newsService: NewsService,
    private readonly loggerService: LoggerService 
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'La noticia ha sido creada exitosamente.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() createNewsDto: CreateNewsDto, @Req() req: any) {
    const createdNews = await this.newsService.create(createNewsDto);
    this.loggerService.logChange(
      'news',
      'create',
      req.user.name, 
      createdNews.id 
    );
    return createdNews;
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Las noticias se han obtenido exitosamente.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findAll() {
    return this.newsService.findAll();
  }

  @Get('count')
  async getCount(): Promise<number> {
    return this.newsService.getCount();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'La noticia se ha obtenido exitosamente.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Post('search/:query')
  @ApiCreatedResponse({
    description: 'Las noticias se han obtenido exitosamente.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  search(@Param('query') query: string) {
    return this.newsService.search(query);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch('image/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'La imagen se ha actualizado exitosamente.'
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo a subir',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async swapImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const image = await this.imageService.create(file);
    return this.newsService.swapImage(id, image.id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'La noticia se ha actualizado exitosamente.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id') id: string,
    @Body() updateNewsDto: UpdateNewsDto,
    @Req() req: any
  ) {
    const updatedNews = await this.newsService.update(id, updateNewsDto);
    this.loggerService.logChange(
      'news',
      'update',
      req.user.name, 
      id 
    );
    return updatedNews;
  }

  @Delete(':id/:user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'La noticia se ha borrado exitosamente.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async remove(
    @Param('id') id: string,
    @Param('user') user: string,
    @Req() req: any
  ) {
    const deletedNews = await this.newsService.remove(id, user);
    this.loggerService.logChange(
      'news',
      'delete',
      req.user.name, 
      id
    ); 
    return deletedNews;
  }
}
