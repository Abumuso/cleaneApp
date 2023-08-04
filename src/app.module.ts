import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { WorkersModule } from './workers/workers.module';
import { AdminsModule } from './admins/admins.module';
import { OrdersModule } from './orders/orders.module';
import { WorkerServiceModule } from './worker_service/worker_service.module';
import { PlasticCardsModule } from './plastic_cards/plastic_cards.module';
import { WorkTimesModule } from './work_times/work_times.module';
import { ServiceTypesModule } from './service_types/service_types.module';
import { PaymentTypesModule } from './payment_types/payment_types.module';
import { RegionsModule } from './regions/regions.module';
import { DistrictsModule } from './districts/districts.module';

@Module({
  imports: [CustomersModule, WorkersModule, AdminsModule, OrdersModule, WorkerServiceModule, PlasticCardsModule, WorkTimesModule, ServiceTypesModule, PaymentTypesModule, RegionsModule, DistrictsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
