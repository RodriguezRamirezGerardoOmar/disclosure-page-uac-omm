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
import { MemoryService } from './memory.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LoggerService } from 'src/services/logger.service';

@Controller('memory')
@ApiTags('Memory')
export class MemoryController {
  constructor(
    private readonly memoryService: MemoryService,
    private readonly loggerService: LoggerService
  ) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The memory limit has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async create(@Body() createMemoryDto: CreateMemoryDto, @Req() req: any) {
    const newMemory = await this.memoryService.create(createMemoryDto);
    this.loggerService.logChange(
      'memory',
      'create',
      req.user.name,
      newMemory.id
    );
    return newMemory;
  }

  @Get()
  @ApiResponse({
    description: 'The memory limit list has been successfully retrieved.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAll() {
    return this.memoryService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    description: 'The memory limit has been successfully retrieved.'
  })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findOne(@Param('id') id: string) {
    return this.memoryService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The memory limit has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async update(
    @Param('id') id: string,
    @Body() updateMemoryDto: UpdateMemoryDto,
    @Req() req: any
  ) {
    const modifiedMemory = await this.memoryService.update(id, updateMemoryDto);
    this.loggerService.logChange('memory', 'update', req.user.name, id);
    return modifiedMemory;
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The memory limit has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async remove(@Param('id') id: string, @Req() req: any) {
    const deletedMemory = await this.memoryService.remove(id);
    this.loggerService.logChange('memory', 'delete', req.user.name, id);
    return deletedMemory;
  }
}
