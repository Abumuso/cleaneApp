import { Module } from '@nestjs/common';
import { WorkerServicesService } from './worker_service.service';
import { WorkerServiceController } from './worker_service.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkService } from './models/worker_service.model';

@Module({
  imports: [SequelizeModule.forFeature([WorkService])],
  controllers: [WorkerServiceController],
  providers: [WorkerServicesService],
})
export class WorkerServiceModule {}
