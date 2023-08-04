import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlasticCardsService } from './plastic_cards.service';
import { CreatePlasticCardDto } from './dto/create-plastic_card.dto';
import { UpdatePlasticCardDto } from './dto/update-plastic_card.dto';

@Controller('plastic-cards')
export class PlasticCardsController {
  constructor(private readonly plasticCardsService: PlasticCardsService) {}

  @Post()
  create(@Body() createPlasticCardDto: CreatePlasticCardDto) {
    return this.plasticCardsService.create(createPlasticCardDto);
  }

  @Get()
  findAll() {
    return this.plasticCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plasticCardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlasticCardDto: UpdatePlasticCardDto) {
    return this.plasticCardsService.update(+id, updatePlasticCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.plasticCardsService.remove(+id);
  }
}
