import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

/*
Input:
  - summary: Short summary of the report (string)
  - report: Detailed report content (string, max 255 characters)
  - itemType: Type of the item being reported (string)
  - itemId: ID of the item being reported (string)
Output:
  - Data Transfer Object (DTO) for creating a report
Return value: Object containing the required fields to create a report
Function: Defines the structure and validation rules for report creation requests
Variables: summary, report, itemType, itemId
Date: 02 - 06 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

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
