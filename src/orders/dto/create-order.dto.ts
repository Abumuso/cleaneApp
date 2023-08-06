import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: '1', description: "Foydalanuvchi 'ID'si" })
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;

  @ApiProperty({ example: '1', description: "Servis 'ID'si" })
  @IsNotEmpty()
  @IsNumber()
  service_id: number;

  @ApiProperty({ example: '2023-08-07', description: 'Buyurtma sanasi' })
  @IsNotEmpty()
  @IsString()
  order_date: string;

  @ApiProperty({ example: '25000', description: 'Buyurtma umumiy narxi' })
  @IsNotEmpty()
  @IsNumber()
  total_price: number;

  @ApiProperty({ example: 1, description: "To'lov turi 'ID'si" })
  @IsNotEmpty()
  @IsNumber()
  payment_type_id: number;

  @ApiProperty({ example: 'true', description: 'Buyurtma tugallanganligi' })
  @IsNotEmpty()
  @IsBoolean()
  is_finished: boolean;
}
