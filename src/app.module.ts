import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { WorkersModule } from './workers/workers.module';
import { AdminsModule } from './admins/admins.module';
import { OrdersModule } from './orders/orders.module';
import { WorkerServiceModule } from './worker_service/worker_service.module';
import { WorkTimesModule } from './work_times/work_times.module';
import { ServiceTypesModule } from './service_types/service_types.module';
import { PaymentTypesModule } from './payment_types/payment_types.module';
import { RegionsModule } from './regions/regions.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { MailModule } from './mail/mail.module';
import { Customer } from './customers/models/customer.model';
import { Region } from './regions/models/region.model';
import { Worker } from './workers/models/worker.model';
import { PaymentType } from './payment_types/models/payment_type.model';
import { ServiceType } from './service_types/models/service_type.model';
import { WorkTime } from './work_times/models/work_time.model';
import { WorkService } from './worker_service/models/worker_service.model';
import { Order } from './orders/models/order.model';
import { Admin } from './admins/models/admin.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        Customer,
        Region,
        Worker,
        PaymentType,
        ServiceType,
        WorkTime,
        WorkService,
        Order,
        Admin,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    CustomersModule,
    WorkersModule,
    AdminsModule,
    OrdersModule,
    WorkerServiceModule,
    WorkTimesModule,
    ServiceTypesModule,
    PaymentTypesModule,
    RegionsModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
