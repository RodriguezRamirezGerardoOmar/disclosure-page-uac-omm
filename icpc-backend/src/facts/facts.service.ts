/*
Input:
  - create: createFactDto (fact data)
  - findAll: none
  - findOne: id (number)
  - update: id (number), updateFactDto (fields to update)
  - remove: id (number)
Output:
  - create: Created fact
  - findAll: Random fact from the list
  - findOne: Found fact
  - update: Updated fact
  - remove: Deleted fact confirmation
Return value: Service for CRUD operations on facts, with persistence in a JSON file
Function: Handles business logic for creating, retrieving, updating, and deleting facts, storing them in a JSON file
Variables: facts (array of strings)
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';

@Injectable()
export class FactsService {
  private facts: string[] = this.loadFacts();

  private loadFacts() {
    const data = fs.readFileSync('src/facts/facts.json', 'utf8');
    return JSON.parse(data);
  }

  private saveFacts() {
    fs.writeFileSync(
      'src/facts/facts.json',
      JSON.stringify(this.facts, null, 2),
      'utf8'
    );
  }

  findAll() {
    const index = Math.floor(Math.random() * this.facts.length);
    const fact = this.facts[index];
    return fact;
  }

  findOne(id: number) {
    return this.facts[id];
  }

  create(createFactDto: CreateFactDto) {
    this.facts.push(createFactDto.text);
    this.saveFacts();
    return createFactDto.text;
  }

  update(id: number, updateFactDto: UpdateFactDto) {
    this.facts[id] = updateFactDto.text;
    this.saveFacts();
    return this.facts[id];
  }

  remove(id: number) {
    const value = this.facts[id];
    this.facts = this.facts.filter(val => val != value);
    this.saveFacts();
    return { message: 'Fact deleted successfully' };
  }
}
