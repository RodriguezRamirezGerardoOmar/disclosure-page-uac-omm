import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/*
Input: title (string), body (string), imageId (string), userAuthor (string), role (string)
Output: DTO object with the necessary data to create a news item
Return value: DTO for news creation
Function: Receives the required data to create a new news item in the system
Variables: title, body, imageId, userAuthor, role
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class CreateNewsDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsString()
  imageId: string;

  @ApiProperty()
  @IsString()
  userAuthor: string;

  @ApiProperty()
  @IsString()
  role: string;
}
