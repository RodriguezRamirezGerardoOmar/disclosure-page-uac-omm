import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  report: string;

  @ApiProperty()
  @IsString()
  itemType: string;

  @ApiProperty()
  @IsString()
  itemId: string;
}
