import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'user1',
    description: 'Admin nomi',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'Admin paroli',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'confirm_password',
    description: 'Admin paroli',
  })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: 'email1@mail.uz',
    description: 'Admin elektron pochtasi',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Admin telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
