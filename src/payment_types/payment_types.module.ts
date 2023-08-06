import { Module } from '@nestjs/common';
import { PaymentTypesService } from './payment_types.service';
import { PaymentTypesController } from './payment_types.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentType } from './models/payment_type.model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentType])],
  controllers: [PaymentTypesController],
  providers: [PaymentTypesService],
})
export class PaymentTypesModule {}
