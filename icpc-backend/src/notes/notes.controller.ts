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

@Controller()
@ApiTags('Notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly commentService: CommentService
  ) {}

  // Endpoint for a post request to create a note, at "/notes"
  @Post('notes')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The note has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  // Endpoint for a get request to retrieve all notes, at "/notes"
  @Get('notes')
  @ApiCreatedResponse({
    description: 'The notes has been successfully retrieved.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAll() {
    return this.notesService.findAll();
  }

  // Endpoint for a get request to retrieve a note by id, at "/notes/:id"
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
    description: 'The notes has been successfully retrieved.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  list(@Body() noteListDto: GetNoteListDto) {
    return this.notesService.findNoteList(noteListDto);
  }

  // Endpoint for a get request to retrieve all notes in a category, at "/notes/category/:categoryId"
  @Get('notes/category/:categoryId')
  @ApiCreatedResponse({
    description: 'The notes has been successfully retrieved.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAllInCategory(@Param('categoryId') categoryId: string) {
    return this.notesService.findAllInCategory(categoryId);
  }

  @Patch('note/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The note has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete('note/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The note has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
