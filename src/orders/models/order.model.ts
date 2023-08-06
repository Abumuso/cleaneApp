import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface OrderAttr {
  cutomer_id: number;
  service_id: number;
  order_date: string;
  total_price: number;
  payment_type_id: number;
  is_finished: boolean;
}

@Table({ tableName: 'order' })
export class Order extends Model<Order, OrderAttr> {
  @ApiProperty({ example: 1, description: 'Unikal ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: "Foydalanuvchi 'ID'si" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id: number;

  @ApiProperty({ example: '1', description: "Servis 'ID'si" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  service_id: number;

  @ApiProperty({ example: '2023-08-07', description: 'Buyurtma sanasi' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  order_date: string;

  @ApiProperty({ example: '25000', description: 'Buyurtma umumiy narxi' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total_price: number;

  @ApiProperty({ example: 1, description: "To'lov turi 'ID'si" })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  payment_type_id: number;

  @ApiProperty({ example: 'true', description: 'Buyurtma tugallanganligi' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_finished: boolean;
}
