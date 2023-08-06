import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { WorkTimesService } from './work_times.service';
import { CreateWorkTimeDto } from './dto/create-work_time.dto';
import { UpdateWorkTimeDto } from './dto/update-work_time.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WorkTime } from './models/work_time.model';

@ApiTags('Ish vaqtlari')
@Controller('work-times')
export class WorkTimesController {
  constructor(private readonly workTimeService: WorkTimesService) {}

  @ApiOperation({ summary: 'Ish vaqtini yaratish' })
  @Post('create')
  async createWorkTime(@Body() createWorkTimeDto: CreateWorkTimeDto) {
    return this.workTimeService.createWorkTime(createWorkTimeDto);
  }

  @ApiOperation({ summary: "Ish vaqtini ko'rish" })
  @Get('all')
  async getAllWorkTimes(): Promise<WorkTime[]> {
    return this.workTimeService.getAllWorkTimes();
  }

  @ApiOperation({ summary: "Ish vaqtini id bo'yicha ko'rish" })
  @Get(':id')
  async getWorkTimeBYId(@Param('id') id: string): Promise<WorkTime> {
    return this.workTimeService.getWorkTimeById(+id);
  }

  @ApiOperation({ summary: "Ish vaqtini o'zgartirish" })
  @Put(':id')
  async updateWorkTime(
    @Param('id') id: string,
    @Body() updateWorkTimeDto: UpdateWorkTimeDto,
  ): Promise<WorkTime> {
    return this.workTimeService.updateWorkTime(+id, updateWorkTimeDto);
  }

  @ApiOperation({ summary: "Ish vaqtini o'chirish" })
  @Delete(':id')
  async deleteWorkTimeById(@Param('id') id: string): Promise<object> {
    return this.workTimeService.deleteWorkTimeById(+id);
  }
}
