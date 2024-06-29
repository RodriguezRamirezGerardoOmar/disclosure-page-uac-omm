import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  summary: string;

  @ApiProperty()
  @IsString()
  report: string;

  @ApiProperty()
  @IsString()
  itemType: string;

  @ApiProperty()
  @IsString()
  itemId: string;
}
