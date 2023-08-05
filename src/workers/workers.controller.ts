import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WorkerService } from './workers.service';
import { Worker } from './models/worker.model';
import { CreateWorkerDto } from './dto/create-worker.dto';
import { Response } from 'express';
import { LoginWorkerDto } from './dto/login-worker.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';

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

  @ApiOperation({ summary: 'activate worker' })
  @ApiResponse({ status: 200, type: [Worker] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.workerService.activate(link);
  }
}
