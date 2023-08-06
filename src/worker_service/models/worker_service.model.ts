import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  worker_id: number;

  @ApiProperty({ example: '1', description: "Servis 'ID'si" })
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
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  work_time_id: number;
}
