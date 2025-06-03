import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/*
Input: body (string)
Output: DTO object with the comment content
Return value: DTO for comment creation
Function: Receives the text of the comment to be created
Variables: body
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  body: string;
}
