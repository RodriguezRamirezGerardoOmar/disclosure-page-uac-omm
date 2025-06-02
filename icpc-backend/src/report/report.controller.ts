import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LoggerService } from 'src/services/logger.service';

@Controller('report')
@ApiTags('Report')
export class ReportController {
  constructor(
    private readonly reportService: ReportService,
    private readonly loggerService: LoggerService
  ) {}

  /*
  Input:
    - create: createReportDto (report data)
    - closeReport: id (string), closeReportDto (user performing the close)
    - findAll: none
    - list: none
    - findOne: id (string)
    - update: id (string), updateReportDto (fields to update)
    - remove: id (string)
  Output:
    - create: Created report
    - closeReport: Closed report
    - findAll: List of all reports
    - list: Filtered or listed reports
    - findOne: Found report
    - update: Updated report
    - remove: Deleted report
  Return value: Report controller with endpoints to create, retrieve, update, delete, list, and close reports
  Function: Handles CRUD operations, listing, and closing of reports, with authentication protection and change logging
  Variables: reportService, loggerService
  Date: 02 - 06 - 2025
  Author: Alan Julian Itzamna Mier Cupul

  Endpoints:
  - POST /report
    Description: Creates a new report
    Permission: Public
    Input: createReportDto
    Output: Created report

  - POST /report/:id
    Description: Closes a report by id
    Permission: USER (authentication required)
    Input: id, closeReportDto (user)
    Output: Closed report

  - GET /report
    Description: Retrieves all reports
    Permission: USER (authentication required)
    Output: List of all reports

  - GET /report/list
    Description: Retrieves a filtered or listed set of reports
    Permission: USER (authentication required)
    Output: Filtered or listed reports

  - GET /report/:id
    Description: Retrieves a report by id
    Permission: USER (authentication required)
    Output: Found report

  - PATCH /report/:id
    Description: Updates a report by id
    Permission: USER (authentication required)
    Input: updateReportDto
    Output: Updated report

  - DELETE /report/:id
    Description: Deletes a report by id
    Permission: USER (authentication required)
    Output: Deleted report
  */

  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @Post(':id')
  @UseGuards(AuthGuard)
  closeReport(
    @Param('id') id: string,
    @Body() closeReportDto: { user: string }
  ) {
    this.loggerService.logChange('Report', 'close', closeReportDto.user, id);
    return this.reportService.close(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.reportService.findAll();
  }

  @Get('list')
  @UseGuards(AuthGuard)
  list() {
    return this.reportService.list();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(id, updateReportDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.reportService.remove(id);
  }
}
