import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { Response } from 'express';
import { LoginAdminDto } from './dto/login-admin.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('Adminlar')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiOperation({ summary: 'register Admin' })
  @ApiResponse({ status: 201, type: Admin })
  @Post('signup')
  registration(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.registration(createAdminDto, res);
  }

  @ApiOperation({ summary: 'login Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  login(
    @Body() loginAdminDto: LoginAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.login(loginAdminDto, res);
  }

  @ApiOperation({ summary: 'logout Admin' })
  @ApiResponse({ status: 200, type: Admin })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.logout(refreshToken, res);
  }

  @UseGuards(AdminGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.adminsService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'activate admin' })
  @ApiResponse({ status: 200, type: [Admin] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.adminsService.activate(link);
  }

  @ApiOperation({ summary: "Adminni ko'rish" })
  @Get('all')
  async getAllAdmins(): Promise<Admin[]> {
    return this.adminsService.getAllAdmins();
  }

  @ApiOperation({ summary: "Adminni id bo'yicha ko'rish" })
  @Get(':id')
  async getAdminBYId(@Param('id') id: string): Promise<Admin> {
    return this.adminsService.getAdminById(+id);
  }

  @ApiOperation({ summary: "Adminni o'zgartirish" })
  @Put(':id')
  async updateAdmin(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminsService.updateAdmin(+id, updateAdminDto);
  }

  @ApiOperation({ summary: "Adminni o'chirish" })
  @Delete(':id')
  async deleteAdminById(@Param('id') id: string): Promise<object> {
    return this.adminsService.deleteAdminById(+id);
  }
}
