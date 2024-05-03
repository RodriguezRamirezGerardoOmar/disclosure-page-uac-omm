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
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiTags
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Auth } from 'src/common/decorators/auth.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiBearerAuth()
  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The tag has been successfully created.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @ApiResponse({
    description: 'The tag list has been successfully retrieved.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findAll() {
    return this.tagsService.findAll();
  }

  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The tag has been successfully retrieved.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The tag has been successfully updated.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({
    description: 'The tag has been successfully deleted.'
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
