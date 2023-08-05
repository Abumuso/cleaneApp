import { Module } from '@nestjs/common';
import { RegionService } from './regions.service';
import { RegionController } from './regions.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './models/region.model';

@Module({
  imports: [SequelizeModule.forFeature([Region])],
  controllers: [RegionController],
  providers: [RegionService],
})
export class RegionsModule {}
