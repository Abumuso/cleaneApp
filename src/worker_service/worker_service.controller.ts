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
import { CreateWorkerServiceDto } from './dto/create-worker_service.dto';
import { UpdateWorkerServiceDto } from './dto/update-worker_service.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WorkerServicesService } from './worker_service.service';
import { WorkService } from './models/worker_service.model';

@ApiTags('Ishchi xizmati')
@Controller('worker-service')
export class WorkerServiceController {
  constructor(private readonly workerSerService: WorkerServicesService) {}

  @ApiOperation({ summary: 'Ishchi xizmatini yaratish' })
  @Post('create')
  async createWorkService(
    @Body() createWorkerServiceDto: CreateWorkerServiceDto,
  ) {
    return this.workerSerService.createWorkerService(createWorkerServiceDto);
  }

  @ApiOperation({ summary: "Ishchi xizmatini ko'rish" })
  @Get('all')
  async getAllWorkerServices(): Promise<WorkService[]> {
    return this.workerSerService.getAllWorkerServices();
  }

  @ApiOperation({ summary: "Ishchi xizmatini id bo'yicha ko'rish" })
  @Get(':id')
  async getWorkerServiceBYId(@Param('id') id: string): Promise<WorkService> {
    return this.workerSerService.getWorkerServiceById(+id);
  }

  @ApiOperation({ summary: "Ishchi xizmatini o'zgartirish" })
  @Put(':id')
  async updateWorkService(
    @Param('id') id: string,
    @Body() updateWorkServiceDto: UpdateWorkerServiceDto,
  ): Promise<WorkService> {
    return this.workerSerService.updateWorkerService(+id, updateWorkServiceDto);
  }

  @ApiOperation({ summary: "Ishchi xizmatini o'chirish" })
  @Delete(':id')
  async deleteWorkServiceById(@Param('id') id: string): Promise<object> {
    return this.workerSerService.deleteWorkerServiceById(+id);
  }
}
