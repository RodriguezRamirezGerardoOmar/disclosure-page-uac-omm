import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CommentService } from 'src/comment/comment.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { GetNoteListDto } from './dto/get-note-list.dto';
import { LoggerService } from '../services/logger.service'; // Importa el LoggerService

@Controller()
@ApiTags('Notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly commentService: CommentService,
    private readonly loggerService: LoggerService // Inyecta el LoggerService
  ) {}

  @Post('notes')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The note has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() createNoteDto: CreateNoteDto) {
    const createdNote = await this.notesService.create(createNoteDto);
    this.loggerService.logChange('notes', 'create', createdNote); // Log de la operación
    return createdNote;
  }

  @Get('notes')
  @ApiCreatedResponse({
    description: 'The notes have been successfully retrieved.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAll() {
    return this.notesService.findAll();
  }

  @Get('note/:id')
  @ApiCreatedResponse({
    description: 'The note has been successfully retrieved.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Post('notes/list/')
  @ApiCreatedResponse({
    description: 'The notes have been successfully retrieved.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  list(@Body() noteListDto: GetNoteListDto) {
    return this.notesService.findNoteList(noteListDto);
  }

  @Get('notes/category/:categoryId')
  @ApiCreatedResponse({
    description: 'The notes have been successfully retrieved.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAllInCategory(@Param('categoryId') categoryId: string) {
    return this.notesService.findAllInCategory(categoryId);
  }

  @Get('notes/count')
  @ApiCreatedResponse({
    description: 'The number of notes has been successfully recovered.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error.' })
  getCount() {
    return this.notesService.getCount();
  }

  @Patch('note/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The note has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const updatedNote = await this.notesService.update(id, updateNoteDto);
    this.loggerService.logChange('notes', 'update', { id, ...updateNoteDto }); // Log de la operación
    return updatedNote;
  }

  @Delete('note/:id/:user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The note has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async remove(@Param('id') id: string, @Param('user') user: string) {
    const deletedNote = await this.notesService.remove(id, user);
    this.loggerService.logChange('notes', 'delete', { id }); // Log de la operación
    return deletedNote;
  }
}
