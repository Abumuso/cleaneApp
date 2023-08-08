import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer } from './models/customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Response } from 'express';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { CustomerGuard } from '../guards/customer.guard';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { SelfGuard } from '../guards/self.guard';

@ApiTags('Foydalanuvchilar')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'register Customer' })
  @ApiResponse({ status: 201, type: Customer })
  @Post('signup')
  registration(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customersService.registration(createCustomerDto, res);
  }

  @ApiOperation({ summary: 'login Customer' })
  @ApiResponse({ status: 200, type: Customer })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginCustomerDto: LoginCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customersService.login(loginCustomerDto, res);
  }

  @ApiOperation({ summary: 'logout Customer' })
  @ApiResponse({ status: 200, type: Customer })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customersService.logout(refreshToken, res);
  }

  @UseGuards(CustomerGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customersService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'activate customer' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.customersService.activate(link);
  }

  @ApiOperation({ summary: "Foydalanuvchini ko'rish" })
  @Get('all')
  async getAllCustomers(): Promise<Customer[]> {
    return this.customersService.getAllCustomers();
  }

  @ApiOperation({ summary: "Foydalanuvchini id bo'yicha ko'rish" })
  @Get(':id')
  async getCustomerBYId(@Param('id') id: string): Promise<Customer> {
    return this.customersService.getCustomerById(+id);
  }

  @ApiOperation({ summary: "Foydalanuvchini o'zgartirish" })
  @UseGuards(SelfGuard)
  @Put(':id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.updateCustomer(+id, updateCustomerDto);
  }

  @ApiOperation({ summary: "Foydalanuvchini o'chirish" })
  @UseGuards(SelfGuard)
  @Delete(':id')
  async deleteCustomerById(@Param('id') id: string): Promise<object> {
    return this.customersService.deleteCustomerById(+id);
  }
}
