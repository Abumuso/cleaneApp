import { Module } from '@nestjs/common';
import { ServiceTypesService } from './service_types.service';
import { ServiceTypesController } from './service_types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServiceType } from './models/service_type.model';

@Module({
  imports: [SequelizeModule.forFeature([ServiceType])],
  controllers: [ServiceTypesController],
  providers: [ServiceTypesService],
})
export class ServiceTypesModule {}
