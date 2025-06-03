import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsObject, IsOptional, IsString, Matches } from 'class-validator';

/*
Input: name (string, must contain letters), commentId (string, related comment id)
Output: DTO object with the necessary data to create a category
Return value: DTO for category creation
Function: Receives the required data to create a new category in the system
Variables: name, commentId
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  @Matches(/[a-zA-Z]/)
  name: string;

  // TODO: Add comment id as foreign key, change type
  @ApiProperty()
  @IsString()
  commentId: string;
}
