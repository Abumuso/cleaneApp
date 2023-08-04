import { PartialType } from '@nestjs/swagger';
import { CreatePlasticCardDto } from './create-plastic_card.dto';

export class UpdatePlasticCardDto extends PartialType(CreatePlasticCardDto) {}
