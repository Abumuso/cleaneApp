import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceTypeDto {
  @ApiProperty({ example: 'gilam yuvish', description: 'Servis nomi' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
