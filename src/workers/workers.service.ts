import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Worker } from './models/worker.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { CreateWorkerDto } from './dto/create-worker.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { LoginWorkerDto } from './dto/login-worker.dto';
import { UpdateWorkerDto } from './dto/update-worker.dto';

@Injectable()
export class WorkerService {
  constructor(
    @InjectModel(Worker) private readonly workerRepo: typeof Worker,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async registration(createWorkerDto: CreateWorkerDto, res: Response) {
    const worker = await this.workerRepo.findOne({
      where: { username: createWorkerDto.username },
    });
    if (worker) {
      throw new BadRequestException('Username already exists!');
    }
    if (createWorkerDto.password !== createWorkerDto.confirm_password) {
      throw new BadRequestException('Passwords is not match!');
    }

    const hashed_password = await bcrypt.hash(createWorkerDto.password, 7);
    const newWorker = await this.workerRepo.create({
      ...createWorkerDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newWorker);

    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updateWorker = await this.workerRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
        activation_link: uniqueKey,
      },
      {
        where: { id: newWorker.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendWorkerConfirmation(updateWorker[1][0]);
    } catch (error) {
      console.log(error);
    }
    const response = {
      message: 'Worker registred',
      user: updateWorker[1][0],
      tokens,
    };
    return response;
  }

  async login(loginWorkerDto: LoginWorkerDto, res: Response) {
    const { email, password } = loginWorkerDto;
    const worker = await this.workerRepo.findOne({ where: { email } });
    if (!worker) {
      throw new UnauthorizedException('Worker not registered');
    }
    if (!worker.is_active) {
      throw new BadRequestException('Worker is not active');
    }
    const isMatchPass = await bcrypt.compare(password, worker.hashed_password);
    if (!isMatchPass) {
      throw new UnauthorizedException('Worker not registered(pass)');
    }
    const tokens = await this.getTokens(worker);
    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.workerRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: worker.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Worker logged in',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const workerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!workerData) {
      throw new ForbiddenException('Worker not found');
    }
    const updateWorker = await this.workerRepo.update(
      { hashed_refresh_token: null },
      { where: { id: workerData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Worker logged out successfully',
      user: updateWorker[1][0],
    };
    return response;
  }

  async refreshToken(worker_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (worker_id != decodedToken['id']) {
      throw new BadRequestException('worker not found');
    }
    const worker = await this.workerRepo.findOne({
      where: { id: worker_id },
    });
    if (!worker || !worker.hashed_refresh_token) {
      throw new BadRequestException('worker not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      worker.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(worker);
    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateWorker = await this.workerRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: worker.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Worker refreshed',
      user: updateWorker[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(worker: Worker) {
    const jwtPayload = {
      id: worker.id,
      phone: worker.phone,
      is_active: worker.is_active,
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
    const updateWorker = await this.workerRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updateWorker[1][0]) {
      throw new BadRequestException('Worker already activated');
    }
    const response = {
      message: 'Worker activated successfully',
      user: updateWorker,
    };
    return response;
  }

  async getAllWorkers(): Promise<Worker[]> {
    const workers = await this.workerRepo.findAll({
      include: { all: true },
    });
    return workers;
  }

  async getWorkerById(id: number): Promise<Worker> {
    const worker = await this.workerRepo.findOne({
      where: { id },
      include: { all: true },
    });
    if (!worker) {
      throw new HttpException('Worker topilmadi', HttpStatus.NOT_FOUND);
    }
    return worker;
  }

  async updateWorker(
    id: number,
    updateWorkerDto: UpdateWorkerDto,
  ): Promise<Worker> {
    const worker = await this.workerRepo.update(updateWorkerDto, {
      where: { id },
      returning: true,
    });
    return worker[1][0].dataValues;
  }

  async deleteWorkerById(id: number): Promise<object> {
    const worker = await this.workerRepo.destroy({
      where: { id },
    });
    if (!worker) {
      throw new HttpException('Worker topilmadi', HttpStatus.NOT_FOUND);
    }
    return { message: "Worker o'chirildi" };
  }
}
