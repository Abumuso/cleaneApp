import { Injectable } from '@nestjs/common';
import { CreatePlasticCardDto } from './dto/create-plastic_card.dto';
import { UpdatePlasticCardDto } from './dto/update-plastic_card.dto';

@Injectable()
export class PlasticCardsService {
  create(createPlasticCardDto: CreatePlasticCardDto) {
    return 'This action adds a new plasticCard';
  }

  findAll() {
    return `This action returns all plasticCards`;
  }

  findOne(id: number) {
    return `This action returns a #${id} plasticCard`;
  }

  update(id: number, updatePlasticCardDto: UpdatePlasticCardDto) {
    return `This action updates a #${id} plasticCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} plasticCard`;
  }
}
