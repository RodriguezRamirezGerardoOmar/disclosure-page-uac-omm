import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

/*
Input: category (string), tags (array of objects: id, name, color)
Output: DTO object with the necessary data to filter and retrieve a list of notes
Return value: DTO for note list filtering
Function: Receives the required data to filter and retrieve notes by category and tags
Variables: category, tags
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class GetNoteListDto {
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
}
