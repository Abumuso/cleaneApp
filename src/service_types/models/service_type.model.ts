import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ServiceTypeAttr {
  name: string;
}

@Table({ tableName: 'service_type' })
export class ServiceType extends Model<ServiceType, ServiceTypeAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'gilam yuvish', description: 'Servis nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
