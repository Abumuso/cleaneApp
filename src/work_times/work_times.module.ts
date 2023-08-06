import { Module } from '@nestjs/common';
import { WorkTimesService } from './work_times.service';
import { WorkTimesController } from './work_times.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkTime } from './models/work_time.model';

@Module({
  imports: [SequelizeModule.forFeature([WorkTime])],
  controllers: [WorkTimesController],
  providers: [WorkTimesService],
})
export class WorkTimesModule {}
