import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWorkerServiceDto } from './dto/create-worker_service.dto';
import { UpdateWorkerServiceDto } from './dto/update-worker_service.dto';
import { InjectModel } from '@nestjs/sequelize';
import { WorkService } from './models/worker_service.model';

@Injectable()
export class WorkerServicesService {
  constructor(
    @InjectModel(WorkService) private workerserviceRepo: typeof WorkService,
  ) {}

  async createWorkerService(
    createWorkerServiceDto: CreateWorkerServiceDto,
  ): Promise<WorkService> {
    const workService = await this.workerserviceRepo.create(
      createWorkerServiceDto,
    );
    return workService;
  }

  async getAllWorkerServices(): Promise<WorkService[]> {
    const workServices = await this.workerserviceRepo.findAll({
      include: { all: true },
    });
    return workServices;
  }

  async getWorkerServiceById(id: number): Promise<WorkService> {
    const workService = await this.workerserviceRepo.findOne({
      where: { id },
    });
    if (!workService) {
      throw new HttpException('WorkService topilmadi', HttpStatus.NOT_FOUND);
    }
    return workService;
  }

  async updateWorkerService(
    id: number,
    updateWorkerServiceDto: UpdateWorkerServiceDto,
  ): Promise<WorkService> {
    const workService = await this.workerserviceRepo.update(
      updateWorkerServiceDto,
      {
        where: { id },
        returning: true,
      },
    );
    return workService[1][0].dataValues;
  }

  async deleteWorkerServiceById(id: number): Promise<object> {
    const workService = await this.workerserviceRepo.destroy({
      where: { id },
    });
    if (!workService) {
      throw new HttpException('WorkService topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "WorkService o'chirildi" };
  }
}
