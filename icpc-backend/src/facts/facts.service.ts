import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateFactDto } from './dto/create-fact.dto';
import { UpdateFactDto } from './dto/update-fact.dto';

const DATA_FILE = path.join('/facts.json');

@Injectable()
export class FactsService {
  private facts = this.loadFacts();

  private loadFacts() {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  }

  private saveFacts() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(this.facts, null, 2), 'utf8');
  }

  findAll() {
    return this.facts;
  }

  findOne(id: number) {
    return this.facts.find(fact => fact.id === id) || null;
  }

  create(createFactDto: CreateFactDto) {
    const newFact = { id: Date.now(), ...createFactDto };
    this.facts.push(newFact);
    this.saveFacts();
    return newFact;
  }

  update(id: number, updateFactDto: UpdateFactDto) {
    const index = this.facts.findIndex(fact => fact.id === id);
    if (index === -1) return null;
    this.facts[index] = { ...this.facts[index], ...updateFactDto };
    this.saveFacts();
    return this.facts[index];
  }

  remove(id: number) {
    this.facts = this.facts.filter(fact => fact.id !== id);
    this.saveFacts();
    return { message: 'Fact deleted successfully' };
  }
}
