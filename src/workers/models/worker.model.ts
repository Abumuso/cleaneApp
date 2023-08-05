import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface WorkerAttrs {
  first_name: string;
  last_name: string;
  passport_series: string;
  username: string;
  hashed_password: string;
  email: string;
  phone: string;
  photo: string;
  birthday: Date;
  region_id: number;
  address: string;
  is_active: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'worker' })
export class Worker extends Model<Worker, WorkerAttrs> {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Shoilhom', description: 'Ishhci ismi' })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({
    example: 'Sharahmetov',
    description: 'Ishhci Familiyasi',
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({
    example: 'AB8445459',
    description: 'Ishhci pasport seriyasi',
  })
  @Column({
    type: DataType.STRING,
  })
  passport_series: string;

  @ApiProperty({
    example: 'user1',
    description: 'Ishhci nomi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: 'password',
    description: 'Ishhci paroli',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'email1@mail.uz',
    description: 'Ishhci elektron pochtasi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Ishhci telefon raqami',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'worker photo link',
    description: 'Ishhci rasmi',
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @ApiProperty({
    example: '01.01.2000',
    description: 'Ishchi tugilgan sanasi',
  })
  @Column({
    type: DataType.DATE,
  })
  birthday: Date;

  @ApiProperty({
    example: 1,
    description: 'Ishchi IDsi',
  })
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @ApiProperty({
    example: 'yunusobod 7',
    description: 'Ishhci adresi',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  address: string;

  @ApiProperty({
    example: 'false',
    description: 'Ishhci tasdiqlangan holati',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'token',
    description: 'Ishhci tokeni',
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
