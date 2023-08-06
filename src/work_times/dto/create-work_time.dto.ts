import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkTimeDto {
  @ApiProperty({ example: '9:00', description: 'Ish vaqtining boshlanishi' })
  @IsNotEmpty()
  @IsString()
  start_time: string;

  @ApiProperty({ example: '17:00', description: 'Ish vaqtining yakunlanishi' })
  @IsNotEmpty()
  @IsString()
  end_time: string;
}
