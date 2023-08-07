import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginAdminDto } from './dto/login-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminsService {
  constructor(
    @InjectModel(Admin) private readonly adminRepo: typeof Admin,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async registration(createAdminDto: CreateAdminDto, res: Response) {
    const admin = await this.adminRepo.findOne({
      where: { username: createAdminDto.username },
    });
    if (admin) {
      throw new BadRequestException('Username already exists!');
    }
    if (createAdminDto.password !== createAdminDto.confirm_password) {
      throw new BadRequestException('Passwords is not match!');
    }

    const hashed_password = await bcrypt.hash(createAdminDto.password, 7);
    const newAdmin = await this.adminRepo.create({
      ...createAdminDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newAdmin);

    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
        activation_link: uniqueKey,
      },
      {
        where: { id: newAdmin.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendAdminConfirmation(updateAdmin[1][0]);
    } catch (error) {
      console.log(error);
    }
    const response = {
      message: 'Admin registred',
      user: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async login(loginAdminDto: LoginAdminDto, res: Response) {
    const { email, password } = loginAdminDto;
    const admin = await this.adminRepo.findOne({ where: { email } });
    if (!admin) {
      throw new UnauthorizedException('Admin not registered');
    }
    if (!admin.is_active) {
      throw new BadRequestException('Admin is not active');
    }
    const isMatchPass = await bcrypt.compare(password, admin.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Admin not registered(pass)');
    }
    const tokens = await this.getTokens(admin);
    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: admin.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin logged in',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const adminData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!adminData) {
      throw new ForbiddenException('Admin not found');
    }
    const updateCustomer = await this.adminRepo.update(
      { hashed_refresh_token: null },
      { where: { id: adminData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Admin logged out successfully',
      user: updateCustomer[1][0],
    };
    return response;
  }

  async refreshToken(admin_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (admin_id != decodedToken['id']) {
      throw new BadRequestException('admin not found');
    }
    const admin = await this.adminRepo.findOne({
      where: { id: admin_id },
    });
    if (!admin || !admin.hashed_refresh_token) {
      throw new BadRequestException('admin not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      admin.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(admin);
    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateAdmin = await this.adminRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: admin.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Admin refreshed',
      user: updateAdmin[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(admin: Admin) {
    const jwtPayload = {
      id: admin.id,
      phone: admin.phone,
      is_active: admin.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }
    const updateCustomer = await this.adminRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updateCustomer[1][0]) {
      throw new BadRequestException('Admin already activated');
    }
    const response = {
      message: 'Admin activated successfully',
      user: updateCustomer,
    };
    return response;
  }

  async getAllAdmins(): Promise<Admin[]> {
    const admins = await this.adminRepo.findAll({
      include: { all: true },
    });
    return admins;
  }

  async getAdminById(id: number): Promise<Admin> {
    const admin = await this.adminRepo.findOne({
      where: { id },
    });
    if (!admin) {
      throw new HttpException('Admin topilmadi', HttpStatus.NOT_FOUND);
    }
    return admin;
  }

  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    const admin = await this.adminRepo.update(updateAdminDto, {
      where: { id },
      returning: true,
    });
    return admin[1][0].dataValues;
  }

  async deleteAdminById(id: number): Promise<object> {
    const admin = await this.adminRepo.destroy({
      where: { id },
    });
    if (!admin) {
      throw new HttpException('Admin topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Admin o'chirildi" };
  }
}
