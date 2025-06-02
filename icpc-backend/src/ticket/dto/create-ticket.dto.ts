import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';

/*
Input:
  - itemType: Type of the item for the ticket (string)
  - description: Description of the ticket (string)
  - operation: Operation type (string)
  - originalExerciseId: ID of the original exercise (string, if itemType is 'exercise')
  - modifiedExerciseId: ID of the modified exercise (string, if itemType is 'exercise')
  - originalNoteId: ID of the original note (string, if itemType is 'note')
  - modifiedNoteId: ID of the modified note (string, if itemType is 'note')
  - originalNewsId: ID of the original news (string, if itemType is 'news')
  - modifiedNewsId: ID of the modified news (string, if itemType is 'news')
  - status: Status of the ticket (string)
Output:
  - Data Transfer Object (DTO) for creating a ticket
Return value: Object containing the required fields to create a ticket
Function: Defines the structure and validation rules for ticket creation requests, supporting multiple item types and operations
Variables: itemType, description, operation, originalExerciseId, modifiedExerciseId, originalNoteId, modifiedNoteId, originalNewsId, modifiedNewsId, status
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export class CreateTicketDto {
  @ApiProperty()
  @IsString()
  itemType: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  operation: string;

  @ValidateIf(itemType => itemType === 'exercise')
  @ApiProperty()
  @IsString()
  originalExerciseId: string;

  @ValidateIf(itemType => itemType === 'exercise')
  @ApiProperty()
  @IsString()
  modifiedExerciseId: string;

  @ValidateIf(itemType => itemType === 'note')
  @ApiProperty()
  @IsString()
  originalNoteId: string;

  @ValidateIf(itemType => itemType === 'note')
  @ApiProperty()
  @IsString()
  modifiedNoteId: string;

  @ValidateIf(itemType => itemType === 'news')
  @ApiProperty()
  @IsString()
  originalNewsId: string;

  @ValidateIf(itemType => itemType === 'news')
  @ApiProperty()
  @IsString()
  modifiedNewsId: string;

  @ApiProperty()
  @IsString()
  status: string;
}
