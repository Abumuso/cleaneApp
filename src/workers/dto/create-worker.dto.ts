import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateWorkerDto {
  @ApiProperty({ example: 'Shoilhom', description: 'Ishchi ismi' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Sharahmetov',
    description: 'Ishchi Familiyasi',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'AB8445459',
    description: 'Ishchi pasport seriyasi',
  })
  @IsNotEmpty()
  @IsString()
  passport_series: string;

  @ApiProperty({
    example: 'user1',
    description: 'Ishchi nomi',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'Ishchi paroli',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'confirm_password',
    description: 'Ishchi paroli',
  })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: 'email1@mail.uz',
    description: 'Ishchi elektron pochtasi',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Ishchi telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: '01.01.2000',
    description: 'Ishchi tugilgan sanasi',
  })
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;

  @ApiProperty({
    example: 1,
    description: 'Ishchi "ID"si',
  })
  @IsNotEmpty()
  @IsNumber()
  region_id: number;

  @ApiProperty({
    example: 'yunusobod 7',
    description: 'Ishchi adresi',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
