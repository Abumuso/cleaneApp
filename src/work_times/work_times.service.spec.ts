import { Test, TestingModule } from '@nestjs/testing';
import { WorkTimesService } from './work_times.service';

describe('WorkTimesService', () => {
  let service: WorkTimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkTimesService],
    }).compile();

    service = module.get<WorkTimesService>(WorkTimesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
