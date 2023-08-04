import { Test, TestingModule } from '@nestjs/testing';
import { WorkTimesController } from './work_times.controller';
import { WorkTimesService } from './work_times.service';

describe('WorkTimesController', () => {
  let controller: WorkTimesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkTimesController],
      providers: [WorkTimesService],
    }).compile();

    controller = module.get<WorkTimesController>(WorkTimesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
