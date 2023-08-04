import { Module } from '@nestjs/common';
import { WorkerServiceService } from './worker_service.service';
import { WorkerServiceController } from './worker_service.controller';

@Module({
  controllers: [WorkerServiceController],
  providers: [WorkerServiceService]
})
export class WorkerServiceModule {}
