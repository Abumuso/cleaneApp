import { Test, TestingModule } from '@nestjs/testing';
import { PlasticCardsService } from './plastic_cards.service';

describe('PlasticCardsService', () => {
  let service: PlasticCardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlasticCardsService],
    }).compile();

    service = module.get<PlasticCardsService>(PlasticCardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
