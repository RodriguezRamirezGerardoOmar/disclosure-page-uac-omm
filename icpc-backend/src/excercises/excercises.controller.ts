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
import { ExcercisesService } from './excercises.service';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { GetExerciseListDto } from './dto/get-exercise-list.dto';
import { LoggerService } from '../services/logger.service'; // Importa el LoggerService

/*
Input:
  - create: createExcerciseDto (exercise data), req (authenticated user)
  - findAll: none
  - count: none
  - findOne: id (string)
  - getList: body (GetExerciseListDto)
  - search: query (string)
  - logRead: id (string)
  - update: id (string), updateExcerciseDto (fields to update), req (authenticated user)
  - remove: id (string), user (string), req (authenticated user)
Output:
  - create: Created exercise
  - findAll: List of exercises
  - count: Number of exercises
  - findOne: Found exercise
  - getList: Filtered list of exercises
  - search: List of exercises matching the query
  - logRead: Boolean indicating if the read was logged
  - update: Updated exercise
  - remove: Deleted exercise
Return value: Exercises controller with endpoints to create, retrieve, update, delete, search, and log exercises
Function: Handles CRUD operations, search, and logging for exercises, with authentication protection and change logging
Variables: exercisesService, loggerService
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Endpoints:
- POST /excercises
  Description: Creates a new exercise
  Permission: USER (authentication required)
  Input: createExcerciseDto
  Output: Created exercise

- GET /excercises
  Description: Retrieves all exercises
  Permission: Public
  Output: List of exercises

- GET /excercises/count
  Description: Retrieves the total number of exercises
  Permission: Public
  Output: Number of exercises

- GET /excercises/:id
  Description: Retrieves an exercise by id
  Permission: Public
  Output: Found exercise

- POST /excercises/list
  Description: Retrieves a filtered list of exercises
  Permission: Public
  Input: GetExerciseListDto
  Output: Filtered list of exercises

- POST /excercises/search/:query
  Description: Searches exercises by query
  Permission: Public
  Output: List of exercises matching the query

- POST /excercises/log/:id
  Description: Logs a read action for an exercise
  Permission: Public
  Output: Boolean indicating if the read was logged

- PATCH /excercises/:id
  Description: Updates an existing exercise
  Permission: USER (authentication required)
  Input: updateExcerciseDto
  Output: Updated exercise

- DELETE /excercises/:id/:user
  Description: Deletes an existing exercise
  Permission: USER (authentication required)
  Output: Deleted exercise
*/
@Controller('excercises')
@ApiTags('Exercises')
export class ExcercisesController {
  constructor(
    private readonly exercisesService: ExcercisesService,
    private readonly loggerService: LoggerService // Inyecta el LoggerService
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The exercise has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(
    @Body() createExcerciseDto: CreateExcerciseDto,
    @Req() req: any
  ) {
    const createdExercise = await this.exercisesService.create(
      createExcerciseDto
    );
    this.loggerService.logChange(
      'excercises',
      'create',
      req.user.name, // Nombre del usuario que hizo la operación
      createdExercise.id // ID del ejercicio creado
    ); // Log de la operación
    return createdExercise;
  }

  @Get()
  @ApiCreatedResponse({
    description: 'Los ejercicios se han obtenido exitosamente.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAll() {
    return this.exercisesService.findAll();
  }

  @Get('/count')
  @ApiCreatedResponse({
    description: 'The exercise count has been successfully obtained.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  count() {
    return this.exercisesService.getCount();
  }

  @Get(':id')
  @ApiCreatedResponse({
    description: 'El ejercicio se ha obtenido exitosamente.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(id);
  }

  @Post('/list')
  getList(@Body() body: GetExerciseListDto) {
    return this.exercisesService.getList(body);
  }

  @Post('search/:query')
  @ApiCreatedResponse({
    description: 'Los ejercicios se han obtenido exitosamente.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async search(@Param('query') query: string) {
    return await this.exercisesService.search(query);
  }

  @Post('/log/:id')
  @ApiCreatedResponse({
    description: 'La lectura se ha registrado exitosamente.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async logRead(@Param('id') id: string) {
    const item = await this.findOne(id);
    try {
      this.loggerService.logRead(
        'exercises',
        item.id,
        `${item.category.name} ${item.category.id}`,
        item.tags.map(tag => `${tag.name} ${tag.id}`).join(', ')
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The exercise has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() updateExcerciseDto: UpdateExcerciseDto,
    @Req() req: any
  ) {
    const updatedExercise = await this.exercisesService.update(
      id,
      updateExcerciseDto
    );
    this.loggerService.logChange(
      'excercises',
      'update',
      req.user.name, // Nombre del usuario que hizo la operación
      id // ID del ejercicio actualizado
    ); // Log de la operación
    return updatedExercise;
  }

  @Delete(':id/:user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The exercise has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async remove(
    @Param('id') id: string,
    @Param('user') user: string,
    @Req() req: any
  ) {
    const deletedExercise = await this.exercisesService.remove(id, user);
    this.loggerService.logChange(
      'excercises',
      'delete',
      req.user.name, // Nombre del usuario que hizo la operación
      id // ID del ejercicio eliminado
    ); // Log de la operación
    return deletedExercise;
  }
}
