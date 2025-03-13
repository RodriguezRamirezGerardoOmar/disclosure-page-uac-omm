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
