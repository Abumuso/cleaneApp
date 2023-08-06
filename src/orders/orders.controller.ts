import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Order } from './models/order.model';

@ApiTags('Buyurtmalar')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @ApiOperation({ summary: 'Buyutmani yaratish' })
  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: "Buyutmani ko'rish" })
  @Get('all')
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @ApiOperation({ summary: "Buyutmani id bo'yicha ko'rish" })
  @Get(':id')
  async getOrderBYId(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(+id);
  }

  @ApiOperation({ summary: "Buyutmani o'zgartirish" })
  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.orderService.updateOrder(+id, updateOrderDto);
  }

  @ApiOperation({ summary: "Buyutmani o'chirish" })
  @Delete(':id')
  async deleteOrderById(@Param('id') id: string): Promise<object> {
    return this.orderService.deleteOrderById(+id);
  }
}
