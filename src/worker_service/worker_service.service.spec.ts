import { Test, TestingModule } from '@nestjs/testing';
import { WorkerServiceService } from './worker_service.service';

describe('WorkerServiceService', () => {
  let service: WorkerServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkerServiceService],
    }).compile();

    service = module.get<WorkerServiceService>(WorkerServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
