import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

/*
Input: level (number), name (string)
Output: DTO object with the necessary data to create a difficulty
Return value: DTO for difficulty creation
Function: Receives the required data to create a new difficulty level in the system
Variables: level, name
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class CreateDifficultyDto {
  @ApiProperty()
  @IsNumber()
  level: number;

  @ApiProperty()
  @IsString()
  name: string;
}
