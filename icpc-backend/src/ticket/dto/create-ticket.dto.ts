import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateIf } from 'class-validator';

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
