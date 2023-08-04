import { Test, TestingModule } from '@nestjs/testing';
import { WorkerServiceController } from './worker_service.controller';
import { WorkerServiceService } from './worker_service.service';

describe('WorkerServiceController', () => {
  let controller: WorkerServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerServiceController],
      providers: [WorkerServiceService],
    }).compile();

    controller = module.get<WorkerServiceController>(WorkerServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
