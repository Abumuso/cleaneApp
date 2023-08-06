import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface PaymentTypeAttr {
  name: string;
}

@Table({ tableName: 'payment_type' })
export class PaymentType extends Model<PaymentType, PaymentTypeAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'cash', description: "To'lov turi nomi" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;
}
