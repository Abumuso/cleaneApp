import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PaymentTypesService } from './payment_types.service';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentType } from './models/payment_type.model';

@ApiTags("To'lov turi nomlari")
@Controller('payment-types')
export class PaymentTypesController {
  constructor(private readonly paymentTypeService: PaymentTypesService) {}

  @ApiOperation({ summary: "To'lov turi nomini yaratish" })
  @Post('create')
  async createPaymentType(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypeService.createPaymentType(createPaymentTypeDto);
  }

  @ApiOperation({ summary: "To'lov turlari nomini ko'rish" })
  @Get('all')
  async getAllPaymentTypes(): Promise<PaymentType[]> {
    return this.paymentTypeService.getAllPaymentTypes();
  }

  @ApiOperation({ summary: "To'lov turi nomini id bo'yicha ko'rish" })
  @Get(':id')
  async getPaymentTypeBYId(@Param('id') id: string): Promise<PaymentType> {
    return this.paymentTypeService.getPaymentTypeById(+id);
  }

  @ApiOperation({ summary: "To'lov turi nomini o'zgartirish" })
  @Put(':id')
  async updatePaymentType(
    @Param('id') id: string,
    @Body() updatePaymentTypeDto: UpdatePaymentTypeDto,
  ): Promise<PaymentType> {
    return this.paymentTypeService.updatePaymentType(+id, updatePaymentTypeDto);
  }

  @ApiOperation({ summary: "To'lov turi nomini o'chirish" })
  @Delete(':id')
  async deletePaymentTypeById(@Param('id') id: string): Promise<object> {
    return this.paymentTypeService.deletePaymentTypeById(+id);
  }
}
