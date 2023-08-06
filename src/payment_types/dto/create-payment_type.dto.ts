import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentTypeDto {
  @ApiProperty({ example: 'cash', description: "To'lov turi nomi" })
  @IsNotEmpty()
  @IsString()
  name: string;
}
