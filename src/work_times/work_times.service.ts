import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkTimeDto } from './dto/create-work_time.dto';
import { UpdateWorkTimeDto } from './dto/update-work_time.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WorkTime } from './models/work_time.model';

@Injectable()
export class WorkTimesService {
  constructor(@InjectModel(WorkTime) private workRepo: typeof WorkTime) {}

  async createWorkTime(
    createWorkTimeDto: CreateWorkTimeDto,
  ): Promise<WorkTime> {
    const workTime = await this.workRepo.create(createWorkTimeDto);
    return workTime;
  }

  async getAllWorkTimes(): Promise<WorkTime[]> {
    const workTimes = await this.workRepo.findAll({
      include: { all: true },
    });
    return workTimes;
  }

  async getWorkTimeById(id: number): Promise<WorkTime> {
    const workTime = await this.workRepo.findOne({ where: { id } });
    if (!workTime) {
      throw new HttpException('WorkTime topilmadi', HttpStatus.NOT_FOUND);
    }
    return workTime;
  }

  async updateWorkTime(
    id: number,
    updateWorkTimeDto: UpdateWorkTimeDto,
  ): Promise<WorkTime> {
    const workTime = await this.workRepo.update(updateWorkTimeDto, {
      where: { id },
      returning: true,
    });
    return workTime[1][0].dataValues;
  }

  async deleteWorkTimeById(id: number): Promise<object> {
    const workTime = await this.workRepo.destroy({ where: { id } });
    if (!workTime) {
      throw new HttpException('WorkTime topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "WorkTime o'chirildi" };
  }
}
