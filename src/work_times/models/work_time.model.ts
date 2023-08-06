import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface WorkTimeAttr {
  start_time: string;
  end_time: string;
}

@Table({ tableName: 'work_time' })
export class WorkTime extends Model<WorkTime, WorkTimeAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '9:00', description: 'Ish vaqtining boshlanishi' })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  start_time: string;

  @ApiProperty({ example: '17:00', description: 'Ish vaqtining yakunlanishi' })
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  end_time: string;
}
