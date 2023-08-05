import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LoginWorkerDto {
  @ApiProperty({
    example: 'email1@mail.uz',
    description: 'Ishchi elektron pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Ishchi paroli',
  })
  @IsStrongPassword()
  password: string;
}
