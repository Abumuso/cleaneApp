import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { Response } from 'express';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer) private readonly customerRepo: typeof Customer,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async registration(createCustomerDto: CreateCustomerDto, res: Response) {
    const customer = await this.customerRepo.findOne({
      where: { username: createCustomerDto.username },
    });
    if (customer) {
      throw new BadRequestException('Username already exists!');
    }
    if (createCustomerDto.password !== createCustomerDto.confirm_password) {
      throw new BadRequestException('Passwords is not match!');
    }

    const hashed_password = await bcrypt.hash(createCustomerDto.password, 7);
    const newCustomer = await this.customerRepo.create({
      ...createCustomerDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newCustomer);

    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const uniqueKey: string = uuidv4();
    const updateCustomer = await this.customerRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
        activation_link: uniqueKey,
      },
      {
        where: { id: newCustomer.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    try {
      await this.mailService.sendCustomerConfirmation(updateCustomer[1][0]);
    } catch (error) {
      console.log(error);
    }
    const response = {
      message: 'Customer registred',
      user: updateCustomer[1][0],
      tokens,
    };
    return response;
  }

  async login(loginCustomerDto: LoginCustomerDto, res: Response) {
    const { email, password } = loginCustomerDto;
    const customer = await this.customerRepo.findOne({ where: { email } });
    if (!customer) {
      throw new UnauthorizedException('Customer not registered');
    }
    if (!customer.is_active) {
      throw new BadRequestException('Customer is not active');
    }
    const isMatchPass = await bcrypt.compare(
      password,
      customer.hashed_password,
    );
    if (!isMatchPass) {
      throw new UnauthorizedException('Customer not registered(pass)');
    }
    const tokens = await this.getTokens(customer);
    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateUser = await this.customerRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: customer.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Customer logged in',
      user: updateUser[1][0],
      tokens,
    };
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const customerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!customerData) {
      throw new ForbiddenException('Customer not found');
    }
    const updateCustomer = await this.customerRepo.update(
      { hashed_refresh_token: null },
      { where: { id: customerData.id }, returning: true },
    );
    res.clearCookie('refresh_token');
    const response = {
      message: 'Customer logged out successfully',
      user: updateCustomer[1][0],
    };
    return response;
  }

  async refreshToken(customer_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (customer_id != decodedToken['id']) {
      throw new BadRequestException('customer not found');
    }
    const customer = await this.customerRepo.findOne({ where: { id: customer_id } });
    if (!customer || !customer.hashed_refresh_token) {
      throw new BadRequestException('customer not found');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      customer.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const tokens = await this.getTokens(customer);
    const hashed_password_token = await bcrypt.hash(tokens.refresh_token, 7);
    const updateCustomer = await this.customerRepo.update(
      {
        hashed_refresh_token: hashed_password_token,
      },
      {
        where: { id: customer.id },
        returning: true,
      },
    );
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'Customer refreshed',
      user: updateCustomer[1][0],
      tokens,
    };
    return response;
  }

  async getTokens(customer: Customer) {
    const jwtPayload = {
      id: customer.id,
      phone: customer.phone,
      is_active: customer.is_active,
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
    const updateCustomer = await this.customerRepo.update(
      { is_active: true },
      { where: { activation_link: link, is_active: false }, returning: true },
    );
    if (!updateCustomer[1][0]) {
      throw new BadRequestException('Customer already activated');
    }
    const response = {
      message: 'Customer activated successfully',
      user: updateCustomer,
    };
    return response;
  }

  //   async findAll(findUserDto: FindUserDto) {
  //     const where = {};
  //     if (findUserDto.first_name) {
  //       where['first_name'] = {
  //         [Op.like]: `%${findUserDto.first_name}%`,
  //       };
  //     }
  //     if (findUserDto.last_name) {
  //       where['last_name'] = {
  //         [Op.like]: `%${findUserDto.last_name}%`,
  //       };
  //     }
  //     if (findUserDto.birthday_begin && findUserDto.birthday_end) {
  //       where[Op.and] = {
  //         birthday: {
  //           [Op.between]: [findUserDto.birthday_begin, findUserDto.birthday_end],
  //         },
  //       };
  //     } else if (findUserDto.birthday_begin) {
  //       where['birthday'] = { [Op.gte]: findUserDto.birthday_begin };
  //     } else if (findUserDto.birthday_end) {
  //       where['birthday'] = { [Op.lte]: findUserDto.birthday_end };
  //     }
  //     const users = await User.findAll({ where });
  //     if (!users) {
  //       throw new BadRequestException('user not found');
  //     }
  //     return users;
  //   }
}
