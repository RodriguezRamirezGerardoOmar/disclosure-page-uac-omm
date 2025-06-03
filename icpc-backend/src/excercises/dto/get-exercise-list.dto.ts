import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

/*
Input: category (string), tags (array of objects: id, name, color), difficulty (string)
Output: DTO object with the necessary data to filter and retrieve a list of exercises
Return value: DTO for exercise list filtering
Function: Receives the required data to filter and retrieve exercises by category, tags, and difficulty
Variables: category, tags, difficulty
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class GetExerciseListDto {
  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsArray()
  tags: {
    id: string;
    name: string;
    color: string;
  }[];

  @ApiProperty()
  @IsString()
  difficulty: string;
}
