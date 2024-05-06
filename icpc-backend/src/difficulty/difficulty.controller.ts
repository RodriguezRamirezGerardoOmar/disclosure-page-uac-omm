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

@ApiTags('Difficulty')
@Controller('difficulty')
export class DifficultyController {
  constructor(private readonly difficultyService: DifficultyService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The difficulty level has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  create(@Body() createDifficultyDto: CreateDifficultyDto) {
    return this.difficultyService.create(createDifficultyDto);
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
  update(
    @Param('id') id: string,
    @Body() updateDifficultyDto: UpdateDifficultyDto
  ) {
    return this.difficultyService.update(id, updateDifficultyDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The difficulty level has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.difficultyService.remove(id);
  }
}
