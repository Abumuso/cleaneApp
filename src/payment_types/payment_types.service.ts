import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment_type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentType } from './models/payment_type.model';

@Injectable()
export class PaymentTypesService {
  constructor(
    @InjectModel(PaymentType) private paymentRepo: typeof PaymentType,
  ) {}

  async createPaymentType(
    createPaymentTypeDto: CreatePaymentTypeDto,
  ): Promise<PaymentType> {
    const paymentType = await this.paymentRepo.create(createPaymentTypeDto);
    return paymentType;
  }

  async getAllPaymentTypes(): Promise<PaymentType[]> {
    const paymentTypes = await this.paymentRepo.findAll({
      include: { all: true },
    });
    return paymentTypes;
  }

  async getPaymentTypeById(id: number): Promise<PaymentType> {
    const paymentType = await this.paymentRepo.findOne({ where: { id } });
    if (!paymentType) {
      throw new HttpException('PaymentType topilmadi', HttpStatus.NOT_FOUND);
    }
    return paymentType;
  }

  async updatePaymentType(
    id: number,
    updatePaymentTypeDto: UpdatePaymentTypeDto,
  ): Promise<PaymentType> {
    const paymentType = await this.paymentRepo.update(updatePaymentTypeDto, {
      where: { id },
      returning: true,
    });
    return paymentType[1][0].dataValues;
  }

  async deletePaymentTypeById(id: number): Promise<object> {
    const paymentType = await this.paymentRepo.destroy({ where: { id } });
    if (!paymentType) {
      throw new HttpException('PaymentType topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "PaymentType o'chirildi" };
  }
}
