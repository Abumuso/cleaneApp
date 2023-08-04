import { Injectable } from '@nestjs/common';
import { CreateWorkTimeDto } from './dto/create-work_time.dto';
import { UpdateWorkTimeDto } from './dto/update-work_time.dto';

@Injectable()
export class WorkTimesService {
  create(createWorkTimeDto: CreateWorkTimeDto) {
    return 'This action adds a new workTime';
  }

  findAll() {
    return `This action returns all workTimes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workTime`;
  }

  update(id: number, updateWorkTimeDto: UpdateWorkTimeDto) {
    return `This action updates a #${id} workTime`;
  }

  remove(id: number) {
    return `This action removes a #${id} workTime`;
  }
}
