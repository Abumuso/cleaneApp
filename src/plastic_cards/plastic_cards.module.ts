import { Module } from '@nestjs/common';
import { PlasticCardsService } from './plastic_cards.service';
import { PlasticCardsController } from './plastic_cards.controller';

@Module({
  controllers: [PlasticCardsController],
  providers: [PlasticCardsService]
})
export class PlasticCardsModule {}
