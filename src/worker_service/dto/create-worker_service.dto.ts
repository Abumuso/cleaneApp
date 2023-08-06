import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateWorkerServiceDto {
  @ApiProperty({ example: '1', description: "Ishchi 'ID'si" })
  @IsNotEmpty()
  @IsNumber()
  worker_id: number;

  @ApiProperty({ example: '1', description: "Servis 'ID'si" })
  @IsNotEmpty()
  @IsNumber()
  service_type_id: number;

  @ApiProperty({ example: '25000', description: 'Servis narxi' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: '1', description: "Ish vaqti 'ID'si" })
  @IsNotEmpty()
  @IsNumber()
  work_time_id: number;
}
