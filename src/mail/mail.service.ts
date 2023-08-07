import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Customer } from '../customers/models/customer.model';
import { Worker } from '../workers/models/worker.model';
import { Admin } from '../admins/models/admin.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendCustomerConfirmation(customer: Customer): Promise<void> {
    const url = `${process.env.API_HOST}/customers/activate/${customer.activation_link}`;
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

  async sendWorkerConfirmation(worker: Worker): Promise<void> {
    const url = `${process.env.API_HOST}/workers/activate/${worker.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: worker.email,
      subject: 'Wellcome to cleaneApp! Confirm your Email!',
      template: './confirmation',
      context: {
        name: worker.first_name,
        url,
      },
    });
  }

  async sendAdminConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}/admins/activate/${admin.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Wellcome to cleaneApp! Confirm your Email!',
      template: './confirmation',
      context: {
        name: admin.username,
        url,
      },
    });
  }
}
