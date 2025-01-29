import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FactsService } from './facts.service';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';

@Controller('facts')
export class FactsController {
  constructor(private readonly factsService: FactsService) {}

  @Post()
  create(@Body() createFactDto: CreateFactDto) {
    return this.factsService.create(createFactDto);
  }

  @Get()
  findAll() {
    return this.factsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.factsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFactDto: UpdateFactDto) {
    return this.factsService.update(+id, updateFactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factsService.remove(+id);
  }
}
