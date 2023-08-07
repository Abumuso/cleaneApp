import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { WorkService } from '../../worker_service/models/worker_service.model';
import { Customer } from '../../customers/models/customer.model';
import { PaymentType } from '../../payment_types/models/payment_type.model';

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
  @ForeignKey(() => Customer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  customer_id: number;

  @ApiProperty({ example: '1', description: "Servis 'ID'si" })
  @ForeignKey(() => WorkService)
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
  @ForeignKey(() => PaymentType)
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

  @BelongsTo(() => WorkService)
  work_service: WorkService;

  @BelongsTo(() => Customer)
  customer: Customer;

  @BelongsTo(() => PaymentType)
  payment_type: PaymentType;
}
