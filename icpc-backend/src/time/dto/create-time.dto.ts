import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateTimeDto {
  @ApiProperty()
  @IsNumber()
  timeLimit: number;
}
