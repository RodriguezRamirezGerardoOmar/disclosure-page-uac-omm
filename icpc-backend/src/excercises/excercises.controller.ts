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

@Controller('excercises')
@ApiTags('Exercises')
export class ExcercisesController {
  constructor(private readonly exercisesService: ExcercisesService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The exercise has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  create(@Body() createExcerciseDto: CreateExcerciseDto) {
    return this.exercisesService.create(createExcerciseDto);
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

  @Get(':id')
  @ApiCreatedResponse({
    description: 'El ejercicio se ha obtenido exitosamente.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(id);
  }

  @Get('count')
  @ApiCreatedResponse({
    description: 'The exercise count has been successfully obtained.'
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  count() {
    return this.exercisesService.count();
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
  search(@Param('query') query: string) {
    return this.exercisesService.search(query);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The exercise has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  update(
    @Param('id') id: string,
    @Body() updateExcerciseDto: UpdateExcerciseDto
  ) {
    return this.exercisesService.update(id, updateExcerciseDto);
  }

  @Delete(':id/:user')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({
    description: 'The exercise has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  remove(@Param('id') id: string, @Param('user') user: string) {
    return this.exercisesService.remove(id, user);
  }
}
