import { Test, TestingModule } from '@nestjs/testing';
import { PlasticCardsController } from './plastic_cards.controller';
import { PlasticCardsService } from './plastic_cards.service';

describe('PlasticCardsController', () => {
  let controller: PlasticCardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlasticCardsController],
      providers: [PlasticCardsService],
    }).compile();

    controller = module.get<PlasticCardsController>(PlasticCardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
