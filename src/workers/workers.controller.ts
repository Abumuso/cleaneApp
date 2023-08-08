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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkerService } from './workers.service';
import { Worker } from './models/worker.model';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Response } from 'express';
import { LoginWorkerDto } from './dto/login-worker.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { WorkerGuard } from '../guards/worker.guard';
import { UpdateWorkerDto } from './dto/update-worker.dto';
import { SelfGuard } from '../guards/self.guard';

@ApiTags('Ishchilar')
@Controller('workers')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @ApiOperation({ summary: 'register Worker' })
  @ApiResponse({ status: 201, type: Worker })
  @Post('signup')
  registration(
    @Body() createWorkerDto: CreateWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.registration(createWorkerDto, res);
  }

  @ApiOperation({ summary: 'login Worker' })
  @ApiResponse({ status: 200, type: Worker })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginWorkerDto: LoginWorkerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.login(loginWorkerDto, res);
  }

  @ApiOperation({ summary: 'logout Worker' })
  @ApiResponse({ status: 200, type: Worker })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.logout(refreshToken, res);
  }

  @UseGuards(WorkerGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.workerService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'activate worker' })
  @ApiResponse({ status: 200, type: [Worker] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.workerService.activate(link);
  }

  @ApiOperation({ summary: "Ishchini ko'rish" })
  @Get('all')
  async getAllWorkers(): Promise<Worker[]> {
    return this.workerService.getAllWorkers();
  }

  @ApiOperation({ summary: "Ishchini id bo'yicha ko'rish" })
  @Get(':id')
  async getWorkerBYId(@Param('id') id: string): Promise<Worker> {
    return this.workerService.getWorkerById(+id);
  }

  @ApiOperation({ summary: "Ishchini o'zgartirish" })
  @UseGuards(SelfGuard)
  @Put(':id')
  async updateWorker(
    @Param('id') id: string,
    @Body() updateWorkerDto: UpdateWorkerDto,
  ): Promise<Worker> {
    return this.workerService.updateWorker(+id, updateWorkerDto);
  }

  @ApiOperation({ summary: "Ishchini o'chirish" })
  @UseGuards(SelfGuard)
  @Delete(':id')
  async deleteWorkerById(@Param('id') id: string): Promise<object> {
    return this.workerService.deleteWorkerById(+id);
  }
}
