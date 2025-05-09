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
