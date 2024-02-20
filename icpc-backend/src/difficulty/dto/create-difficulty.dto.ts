import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateDifficultyDto {
  @ApiProperty()
  @IsNumber()
  level: number;

  @ApiProperty()
  @IsString()
  name: string;
}
