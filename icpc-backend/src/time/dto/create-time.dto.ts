import { IsOptional, IsNumber } from 'class-validator';

export class CreateTimeDto {
  @IsOptional()
  @IsNumber()
  timeLimit: number;
}
