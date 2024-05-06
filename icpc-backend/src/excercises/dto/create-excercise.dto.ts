import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateExcerciseDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  categoryId: string;

  @ApiProperty()
  @IsString()
  difficultyId: string;

  @ApiProperty()
  @IsNumber()
  timeId: number;

  @ApiProperty()
  @IsNumber()
  memoryId: number;

  @ApiProperty()
  @IsString()
  input: string;

  @ApiProperty()
  @IsString()
  output: string;

  @ApiProperty()
  @IsString()
  constraints: string;

  @ApiProperty()
  @IsString()
  clue: string;

  @ApiProperty()
  @IsArray()
  tags: any;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  example_input: string;

  @ApiProperty()
  @IsString()
  example_output: string;

  @ApiProperty()
  @IsString()
  solution: string;

  @ApiProperty()
  @IsBoolean()
  isVisible: boolean;
}
