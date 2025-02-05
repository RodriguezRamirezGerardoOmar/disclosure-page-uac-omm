import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength, Matches } from 'class-validator';

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