import { Module } from '@nestjs/common';
import { WorkerService } from './workers.service';
import { WorkerController } from './workers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Worker } from './models/worker.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Worker]),
    JwtModule.register({}),
    MailModule,
  ],
  controllers: [WorkerController],
  providers: [WorkerService],
})
export class WorkersModule {}
