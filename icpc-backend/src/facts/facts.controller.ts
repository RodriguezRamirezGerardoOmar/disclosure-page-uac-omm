import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { FactsService } from './facts.service';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

/*
Input:
  - create: createFactDto (fact data)
  - findAll: none
  - findOne: id (string)
  - update: id (string), updateFactDto (fields to update)
  - remove: id (string)
Output:
  - create: Created fact
  - findAll: List of facts
  - findOne: Found fact
  - update: Updated fact
  - remove: Deleted fact
Return value: Facts controller with endpoints to create, retrieve, update, and delete facts
Function: Handles CRUD operations for facts
Variables: factsService
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul

Endpoints:
- POST /facts
  Description: Creates a new fact
  Permission: USER (authentication required)
  Input: createFactDto
  Output: Created fact

- GET /facts
  Description: Retrieves all facts
  Permission: Public
  Output: List of facts

- GET /facts/:id
  Description: Retrieves a fact by id
  Permission: Public
  Output: Found fact

- PATCH /facts/:id
  Description: Updates an existing fact
  Permission: USER (authentication required)
  Input: updateFactDto
  Output: Updated fact

- DELETE /facts/:id
  Description: Deletes an existing fact
  Permission: USER (authentication required)
  Output: Deleted fact
*/

@Controller('facts')
export class FactsController {
  constructor(private readonly factsService: FactsService) {}

  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFactDto: UpdateFactDto) {
    return this.factsService.update(+id, updateFactDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.factsService.remove(+id);
  }
}
