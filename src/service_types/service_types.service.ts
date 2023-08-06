import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceTypeDto } from './dto/create-service_type.dto';
import { UpdateServiceTypeDto } from './dto/update-service_type.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ServiceType } from './models/service_type.model';

@Injectable()
export class ServiceTypesService {
  constructor(
    @InjectModel(ServiceType) private serviceRepo: typeof ServiceType,
  ) {}

  async createServiceType(
    createServiceTypeDto: CreateServiceTypeDto,
  ): Promise<ServiceType> {
    const serviceType = await this.serviceRepo.create(createServiceTypeDto);
    return serviceType;
  }

  async getAllServiceTypes(): Promise<ServiceType[]> {
    const serviceTypes = await this.serviceRepo.findAll({
      include: { all: true },
    });
    return serviceTypes;
  }

  async getServiceTypeById(id: number): Promise<ServiceType> {
    const serviceType = await this.serviceRepo.findOne({ where: { id } });
    if (!serviceType) {
      throw new HttpException('ServiceType topilmadi', HttpStatus.NOT_FOUND);
    }
    return serviceType;
  }

  async updateServiceType(
    id: number,
    updateServiceTypeDto: UpdateServiceTypeDto,
  ): Promise<ServiceType> {
    const serviceType = await this.serviceRepo.update(updateServiceTypeDto, {
      where: { id },
      returning: true,
    });
    return serviceType[1][0].dataValues;
  }

  async deleteServiceTypeById(id: number): Promise<object> {
    const serviceType = await this.serviceRepo.destroy({ where: { id } });
    if (!serviceType) {
      throw new HttpException('ServiceType topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "ServiceType o'chirildi" };
  }
}
