import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Req
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CommentService } from 'src/comment/comment.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { GetNoteListDto } from './dto/get-note-list.dto';
import { LoggerService } from '../services/logger.service';


/*
Input:
  - create: createNoteDto (note data), req (authenticated user)
  - findAll: none
  - findOne: id (string)
  - list: noteListDto (GetNoteListDto)
  - search: query (string)
  - logRead: id (string)
  - findAllInCategory: categoryId (string)
  - getCount: none
  - update: id (string), updateNoteDto (fields to update), req (authenticated user)
  - remove: id (string), user (string), req (authenticated user)
Output:
  - create: Created note
  - findAll: List of notes
  - findOne: Found note
  - list: Filtered list of notes
  - search: List of notes matching the query
  - logRead: Boolean indicating if the read was logged
  - findAllInCategory: List of notes in the category
  - getCount: Number of notes
  - update: Updated note
  - remove: Deleted note
Return value: Notes controller with endpoints to create, retrieve, update, delete, search, and log notes
Function: Handles CRUD operations, search, and logging for notes, with authentication protection and change logging
Variables: notesService, commentService, loggerService
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Endpoints:
- POST /notes
  Description: Creates a new note
  Permission: USER (authentication required)
  Input: createNoteDto
  Output: Created note

- GET /notes
  Description: Retrieves all notes
  Permission: Public
  Output: List of notes

- GET /note/:id
  Description: Retrieves a note by id
  Permission: Public
  Output: Found note

- POST /notes/list
  Description: Retrieves a filtered list of notes
  Permission: Public
  Input: GetNoteListDto
  Output: Filtered list of notes

- POST /notes/search/:query
  Description: Searches notes by query
  Permission: Public
  Output: List of notes matching the query

- POST /notes/log/:id
  Description: Logs a read action for a note
  Permission: Public
  Output: Boolean indicating if the read was logged

- GET /notes/category/:categoryId
  Description: Retrieves notes by category
  Permission: Public
  Output: List of notes in the category

- GET /notes/count
  Description: Retrieves the total number of notes
  Permission: Public
  Output: Number of notes

- PATCH /note/:id
  Description: Updates an existing note
  Permission: USER (authentication required)
  Input: updateNoteDto
  Output: Updated note

- DELETE /note/:id/:user
  Description: Deletes an existing note
  Permission: USER (authentication required)
  Output: Deleted note
*/

@Controller()
@ApiTags('Notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly commentService: CommentService,
    private readonly loggerService: LoggerService
  ) {}

  @Post('notes')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The note has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() createNoteDto: CreateNoteDto, @Req() req: any) {
    const createdNote = await this.notesService.create(createNoteDto);
    this.loggerService.logChange(
      'notes',
      'create',
      req.user.name,
      createdNote.id 
    ); 
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

  @Post('notes/search/:query')
  @ApiCreatedResponse({
    description: 'The notes have been successfully retrieved.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  search(@Param('query') query: string) {
    return this.notesService.search(query);
  }

  @Post('notes/log/:id')
  @ApiCreatedResponse({
    description: 'La lectura se ha registrado exitosamente.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async logRead(@Param('id') id: string) {
    const item = await this.findOne(id);
    try {
      this.loggerService.logRead(
        'notes',
        item.id,
        `${item.category.name} ${item.category.id}`,
        item.tags.map(tag => `${tag.name} ${tag.id}`).join(', ')
      );
      return true;
    } catch (error) {
      return false;
    }
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
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @Req() req: any
  ) {
    const updatedNote = await this.notesService.update(id, updateNoteDto);
    this.loggerService.logChange(
      'notes',
      'update',
      req.user.name,
      id
    ); 
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
  async remove(
    @Param('id') id: string,
    @Param('user') user: string,
    @Req() req: any
  ) {
    const deletedNote = await this.notesService.remove(id, user);
    this.loggerService.logChange(
      'notes',
      'delete',
      req.user.name, 
      id 
    ); 
    return deletedNote;
  }
}