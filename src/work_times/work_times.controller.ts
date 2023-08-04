import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WorkTimesService } from './work_times.service';
import { CreateWorkTimeDto } from './dto/create-work_time.dto';
import { UpdateWorkTimeDto } from './dto/update-work_time.dto';

@Controller('work-times')
export class WorkTimesController {
  constructor(private readonly workTimesService: WorkTimesService) {}

  @Post()
  create(@Body() createWorkTimeDto: CreateWorkTimeDto) {
    return this.workTimesService.create(createWorkTimeDto);
  }

  @Get()
  findAll() {
    return this.workTimesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workTimesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkTimeDto: UpdateWorkTimeDto) {
    return this.workTimesService.update(+id, updateWorkTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workTimesService.remove(+id);
  }
}
