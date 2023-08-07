import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Worker } from '../../workers/models/worker.model';
import { ServiceType } from '../../service_types/models/service_type.model';
import { WorkTime } from '../../work_times/models/work_time.model';

interface WorkServiceAttr {
  worker_id: number;
  service_type_id: number;
  price: number;
  work_time_id: number;
}

@Table({ tableName: 'worker_service' })
export class WorkService extends Model<WorkService, WorkServiceAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: "Ishchi 'ID'si" })
  @ForeignKey(() => Worker)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  worker_id: number;

  @ApiProperty({ example: '1', description: "Servis 'ID'si" })
  @ForeignKey(() => ServiceType)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  service_type_id: number;

  @ApiProperty({ example: '25000', description: 'Servis narxi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ApiProperty({ example: '1', description: "Ish vaqti 'ID'si" })
  @ForeignKey(() => WorkTime)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  work_time_id: number;

  @BelongsTo(() => Worker)
  worker: Worker;

  @BelongsTo(() => ServiceType)
  service_type: ServiceType;

  @BelongsTo(() => WorkTime)
  work_time: WorkTime;
}
