import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Customer } from '../customers/models/customer.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendCustomerConfirmation(customer: Customer): Promise<void> {
    const url = `${process.env.API_HOST}/api/customers/activate/${customer.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: customer.email,
      subject: 'Wellcome to cleaneApp! Confirm your Email!',
      template: './confirmation',
      context: {
        name: customer.first_name,
        url,
      },
    });
  }
}
