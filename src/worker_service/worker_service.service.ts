import { Injectable } from '@nestjs/common';
import { CreateWorkerServiceDto } from './dto/create-worker_service.dto';
import { UpdateWorkerServiceDto } from './dto/update-worker_service.dto';

@Injectable()
export class WorkerServiceService {
  create(createWorkerServiceDto: CreateWorkerServiceDto) {
    return 'This action adds a new workerService';
  }

  findAll() {
    return `This action returns all workerService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} workerService`;
  }

  update(id: number, updateWorkerServiceDto: UpdateWorkerServiceDto) {
    return `This action updates a #${id} workerService`;
  }

  remove(id: number) {
    return `This action removes a #${id} workerService`;
  }
}
