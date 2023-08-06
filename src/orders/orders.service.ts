import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderRepo: typeof Order) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = await this.orderRepo.create(createOrderDto);
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderRepo.findAll({
      include: { all: true },
    });
    return orders;
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
    });
    if (!order) {
      throw new HttpException('Order topilmadi', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.orderRepo.update(updateOrderDto, {
      where: { id },
      returning: true,
    });
    return order[1][0].dataValues;
  }

  async deleteOrderById(id: number): Promise<object> {
    const order = await this.orderRepo.destroy({
      where: { id },
    });
    if (!order) {
      throw new HttpException('Order topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Order o'chirildi" };
  }
}
