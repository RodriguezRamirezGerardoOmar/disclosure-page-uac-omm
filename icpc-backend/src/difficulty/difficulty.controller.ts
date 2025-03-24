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
import { DifficultyService } from './difficulty.service';
import { CreateDifficultyDto } from './dto/create-difficulty.dto';
import { UpdateDifficultyDto } from './dto/update-difficulty.dto';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LoggerService } from 'src/services/logger.service';

@ApiTags('Difficulty')
@Controller('difficulty')
export class DifficultyController {
  constructor(
    private readonly difficultyService: DifficultyService,
    private readonly loggerService: LoggerService
  ) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The difficulty level has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(
    @Body() createDifficultyDto: CreateDifficultyDto,
    @Req() req: any
  ) {
    const newDifficulty = await this.difficultyService.create(
      createDifficultyDto
    );
    this.loggerService.logChange(
      'difficulty',
      'create',
      req.user.name,
      newDifficulty.id
    );
    return newDifficulty;
  }

  @Get()
  @ApiResponse({
    description: 'The difficulty level list has been successfully retrieved.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAll() {
    return this.difficultyService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    description: 'The difficulty level has been successfully retrieved.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findOne(@Param('id') id: string) {
    return this.difficultyService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The difficulty level has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() updateDifficultyDto: UpdateDifficultyDto,
    @Req() req: any
  ) {
    const modifiedDifficulty = await this.difficultyService.update(
      id,
      updateDifficultyDto
    );
    this.loggerService.logChange(
      'difficulty',
      'update',
      req.user.name,
      modifiedDifficulty.id
    );
    return modifiedDifficulty;
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The difficulty level has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async remove(@Param('id') id: string, @Req() req: any) {
    const deletedDifficulty = await this.difficultyService.remove(id);
    this.loggerService.logChange('difficulty', 'delete', req.user.name, id);
    return deletedDifficulty;
  }
}
