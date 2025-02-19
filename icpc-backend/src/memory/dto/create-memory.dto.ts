import { IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateMemoryDto {
  @IsOptional()
  @IsNumber()
  value: number;

  @IsOptional()
  @IsString()
  id: string;
}
