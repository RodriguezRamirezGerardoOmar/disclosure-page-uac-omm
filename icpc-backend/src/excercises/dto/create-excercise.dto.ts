import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsObject,
  IsOptional,
  IsString
} from 'class-validator';

/*
Input: name (string), category (object: name, id), difficulty (object: name, id), constraints (string), clue (string), tags (array), author (string), description (string), solution (string), isVisible (boolean), userAuthor (string), role (string)
Output: DTO object with the necessary data to create an exercise
Return value: DTO for exercise creation
Function: Receives the required data to create a new exercise in the system
Variables: name, category, difficulty, constraints, clue, tags, author, description, solution, isVisible, userAuthor, role
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class CreateExcerciseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsObject()
  category: { name: string; id: string };

  @ApiProperty()
  @IsObject()
  difficulty: { name: string; id: string };

  @ApiProperty()
  @IsString()
  constraints: string;

  @ApiProperty()
  @IsString()
  clue: string;

  @ApiProperty()
  @IsArray()
  tags: any;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  solution: string;

  @ApiProperty()
  @IsBoolean()
  isVisible: boolean;

  @ApiProperty()
  @IsString()
  userAuthor: string;

  @ApiProperty()
  @IsString()
  role: string;
}
