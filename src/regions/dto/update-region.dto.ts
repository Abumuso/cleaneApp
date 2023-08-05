import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRegionDto {
  @ApiProperty({ example: 'Tashkent', description: 'Region nomi' })
  @IsOptional()
  @IsString()
  name: string;
}
