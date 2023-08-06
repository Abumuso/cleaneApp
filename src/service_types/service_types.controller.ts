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
import { ServiceTypesService } from './service_types.service';
import { CreateServiceTypeDto } from './dto/create-service_type.dto';
import { UpdateServiceTypeDto } from './dto/update-service_type.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceType } from './models/service_type.model';

@ApiTags('Servis nomlari')
@Controller('service-types')
export class ServiceTypesController {
  constructor(private readonly serviceTypeService: ServiceTypesService) {}

  @ApiOperation({ summary: 'Servisni yaratish' })
  @Post('create')
  async createServiceType(@Body() createServiceTypeDto: CreateServiceTypeDto) {
    return this.serviceTypeService.createServiceType(createServiceTypeDto);
  }

  @ApiOperation({ summary: "Servisni ko'rish" })
  @Get('all')
  async getAllServiceTypes(): Promise<ServiceType[]> {
    return this.serviceTypeService.getAllServiceTypes();
  }

  @ApiOperation({ summary: "Servisni id bo'yicha ko'rish" })
  @Get(':id')
  async getServiceTypeBYId(@Param('id') id: string): Promise<ServiceType> {
    return this.serviceTypeService.getServiceTypeById(+id);
  }

  @ApiOperation({ summary: "Servisni o'zgartirish" })
  @Put(':id')
  async updateServiceType(
    @Param('id') id: string,
    @Body() updateServiceTypeDto: UpdateServiceTypeDto,
  ): Promise<ServiceType> {
    return this.serviceTypeService.updateServiceType(+id, updateServiceTypeDto);
  }

  @ApiOperation({ summary: "Servisni o'chirish" })
  @Delete(':id')
  async deleteServiceTypeById(@Param('id') id: string): Promise<object> {
    return this.serviceTypeService.deleteServiceTypeById(+id);
  }
}
