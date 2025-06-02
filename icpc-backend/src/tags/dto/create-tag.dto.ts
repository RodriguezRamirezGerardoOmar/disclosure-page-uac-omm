import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, Matches } from 'class-validator';

/*
Input:
  - name: Name of the tag (string)
  - color: Hexadecimal color code for the tag (string, 6 characters)
Output:
  - Data Transfer Object (DTO) for creating a tag
Return value: Object containing the required fields to create a tag
Function: Defines the structure and validation rules for tag creation requests
Variables: name, color
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

// create-tag.dto.ts
export class CreateTagDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @Matches(/^[0-9A-Fa-f]{6}$/i)
  color: string;
}