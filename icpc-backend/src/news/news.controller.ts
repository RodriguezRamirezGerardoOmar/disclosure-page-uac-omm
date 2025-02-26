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
  UseInterceptors
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
import { LoggerService } from '../services/logger.service'; // Importa el LoggerService
import { ImageService } from 'src/image/image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('news')
@ApiTags('News')
export class NewsController {
  constructor(
    private readonly imageService: ImageService,
    private readonly newsService: NewsService,
    private readonly loggerService: LoggerService // Inyecta el LoggerService
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
  async create(@Body() createNewsDto: CreateNewsDto) {
    const createdNews = await this.newsService.create(createNewsDto);
    this.loggerService.logChange('news', 'create', createdNews); // Log de la operación
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
  async update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    //console.log('updateNewsDto', updateNewsDto);  //TODO Delete this <---
    const updatedNews = await this.newsService.update(id, updateNewsDto);
    this.loggerService.logChange('news', 'update', { id, ...updateNewsDto }); // Log de la operación
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
  async remove(@Param('id') id: string, @Param('user') user: string) {
    const deletedNews = await this.newsService.remove(id, user);
    this.loggerService.logChange('news', 'delete', { id }); // Log de la operación
    return deletedNews;
  }
}
