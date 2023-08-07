import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttrs {
  username: string;
  hashed_password: string;
  email: string;
  phone: string;
  is_creator: boolean;
  is_active: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'user1',
    description: 'Admin nomi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'Admin paroli',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'email1@mail.uz',
    description: 'Admin elektron pochtasi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Admin telefon raqami',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'false',
    description: 'Admin statusi',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Admin tasdiqlangan holati',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'token',
    description: 'Admin tokeni',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
}
