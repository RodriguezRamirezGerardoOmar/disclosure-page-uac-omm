/*
Inheroty from CreateReportDto to allow partial updates
*/

import { PartialType } from '@nestjs/swagger';
import { CreateReportDto } from './create-report.dto';

export class UpdateReportDto extends PartialType(CreateReportDto) {}
