import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { CustomLogger } from 'src/customLogger';
import { template } from 'handlebars';

@Injectable()
export class MailService {
  constructor(
    private readonly customLogger: CustomLogger,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async welcomeMail(email: string, username: string, token: number) {
    const subject = 'Verify Email Address';
    this.customLogger.log(`reset link to be sent to ${email}`);
    await this.sendDefaultMail(email, subject, 'welcome', {
      email,
      username,
      token,
    });
  }

  async joinCommunityMail(email: string, name: string) {
    const subject = '🕺💃 Welcome to Allies Community of Creators & Coaches 🚀';
    this.customLogger.log(`community email sent to ${email}`);
    await this.sendDefaultMail(email, subject, 'community', {
      email,
      name,
    });
  }

  async courseNewUserMail(email: string, username: string, password: string) {
    const subject = `🥳 Congratulations ${username} - Course Enrollment`;
    this.customLogger.log(`new user course enrollment sent to ${email}`);
    await this.sendDefaultMail(email, subject, 'course-enrollment-new-user', {
      email,
      username,
      password,
    });
  }

  async courseExistingUserMail(email: string, username: string) {
    const subject = `🥳 Congratulations ${username} - Course Enrollment`;
    this.customLogger.log(`existing user course enrollment sent to ${email}`);
    await this.sendDefaultMail(email, subject, 'course-enrollment', {
      email,
      username,
    });
  }

  async productNewUserMail(email: string, username: string, password: string) {
    const subject = `🥳 Congratulations ${username} - Here is your Digital Product`;
    this.customLogger.log(`new user digital product purchase sent to ${email}`);
    await this.sendDefaultMail(email, subject, 'product-new-user', {
      email,
      username,
      password,
    });
  }

  async productExistingUserMail(email: string, username: string) {
    const subject = `🥳 Congratulations ${username} - Course Enrollment`;
    this.customLogger.log(
      `existing user digital product purchase sent to ${email}`,
    );
    await this.sendDefaultMail(email, subject, 'product-purchase', {
      email,
      username,
    });
  }

  async courseCreatorMail(email: string, username: string, course: string) {
    const subject = `🥳 New Student Enrollments: ${course}`;
    this.customLogger.log(`creator course enrollment sent to ${email}`);
    await this.sendDefaultMail(email, subject, 'course-purchase', {
      email,
      username,
      course,
    });
  }

  async freeProductCreatorMail(
    email: string,
    username: string,
    product: string,
  ) {
    const subject = `🥳 New Product Download: ${product}`;
    this.customLogger.log(`creator free product download sent to ${email}`);
    await this.sendDefaultMail(email, subject, 'free-product-download', {
      email,
      username,
      product,
    });
  }

  async productCreatorMail(email: string, username: string, product: string) {
    const subject = `🥳 New Product Purchase: ${product}`;
    this.customLogger.log(`creator purchased product sent to ${email}`);
    await this.sendDefaultMail(email, subject, 'product-paid-purchase', {
      email,
      username,
      product,
    });
  }

  async cohortInstallmentMail(email: string, username: string, course: string) {
    const subject = `🥳 New Payment Received: ${course}`;
    this.customLogger.log(`cohort installment payment sent to ${email}`);
    await this.sendDefaultMail(email, subject, 'installment-payment', {
      email,
      username,
      course,
    });
  }

  async passwordResetLink(email: string, otp: number, message: string = null) {
    const subject = 'Reset Password Link';
    this.customLogger.log(`reset link to be sent to ${email}`);
    return this.sendDefaultMail(email, subject, 'resetPassword', {
      email,
      otp,
    });
  }

  async affiliateMarketCommissionChange(
    email: string,
    username: string,
    product: string,
  ) {
    const subject = `🥳 Commission Fee Change on: ${product}`;
    this.customLogger.log(`commission fee changed ${email}`);
    await this.sendDefaultMail(email, subject, 'commission-fee-change', {
      email,
      username,
      product,
    });
  }


  private async sendDefaultMail(
    email,
    subject,
    template,
    context,
  ): Promise<void> {
    const mailOptions = {
      from: `Allies ${this.configService.get<string>('EMAIL_FROM')}`,
      to: email,
      subject,
      template,
      context: { ...context, year: new Date().getFullYear() },
    };
    await this.mailerService.sendMail(mailOptions);
  }
}
