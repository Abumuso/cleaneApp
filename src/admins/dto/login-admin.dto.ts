import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginAdminDto {
  @ApiProperty({
    example: 'email1@mail.uz',
    description: 'Admin elektron pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Admin paroli',
  })
  @IsStrongPassword()
  password: string;
}
