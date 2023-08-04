import { Module } from '@nestjs/common';
import { WorkTimesService } from './work_times.service';
import { WorkTimesController } from './work_times.controller';

@Module({
  controllers: [WorkTimesController],
  providers: [WorkTimesService]
})
export class WorkTimesModule {}
