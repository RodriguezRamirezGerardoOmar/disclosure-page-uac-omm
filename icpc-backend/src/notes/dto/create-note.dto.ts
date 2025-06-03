import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsString
} from 'class-validator';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

/*
Input: categoryId (object: name, id), title (string), tags (array), description (string), body (string), isVisible (boolean), userAuthor (string), role (string)
Output: DTO object with the necessary data to create a note
Return value: DTO for note creation
Function: Receives the required data to create a new note in the system
Variables: categoryId, title, tags, description, body, isVisible, userAuthor, role
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class CreateNoteDto {
  // TODO: Add category id as foreign key, change type
  @ApiProperty()
  @IsObject()
  categoryId: { name: string; id: string };

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsArray()
  tags: any;

  // TODO: Add comment id as foreign key, change type
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body: string;

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

export class CreateNoteResponseDto extends CreateNoteDto {}

export class NoteResponseCategoryDto extends IntersectionType(
  CreateNoteDto,
  CreateCategoryDto
) {}
