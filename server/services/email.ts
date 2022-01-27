"use strict";

import { Transporter } from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import { SMTP } from '../config'
import { MailOptions } from 'nodemailer/lib/json-transport';

/**
 * Email Service
 */
export class Email {
  private readonly transporter: Transporter;
  private readonly options: MailOptions;
  private companyData;

  /** 
   * Constructor 
   * @param options Mail options
   */
  constructor(options: MailOptions) {
    this.initalize();
    this.transporter = SMTP.transporter
    this.options = Object.assign({}, SMTP.options, options);
    this.companyData = {};
  }

  /**
   * Initilaze company data
   */
  private initalize() {
    this.companyData = {
      name: process.env.COMPANY_NAME,
      streetAddress: process.env.COMPANY_ADDRESS,
      city: process.env.COMPANY_CITY,
      state: process.env.COMPANY_STATE,
      zipCode: process.env.COMPANY_ZIP,
    };
  }

  /**
   * Verifys the Nodemailer Transport instance
   */
  public async verify() {
    this.transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take messages");
      }
    });
  }

  /**
   * Sends account welcome email
   * @param firstName recipents firstname or pass the default email
   * @returns results from send email method
   */
  public async sendAccountWelcomeEmail(firstName: String) {
    return await this.sendEmail({ name: firstName, company: this.companyData }, "views/email/account-welcome.ejs")
  }

  /**
   * Sends account forgot-password email
   * @param resetLink password reset email link
   * @returns results from send email method
   */
  public async sendAccountForgotPasswordEmail(resetLink: String) {
    return await this.sendEmail({ resetLink: resetLink, company: this.companyData }, "views/email/account-forgot-password.ejs")
  }

  /**
   * Sends account verification email
   * @returns results from send email method  
   */
  public async sendAccountVerificationEmail() {
    return await this.sendEmail({ company: this.companyData }, "views/email/account-verification.ejs")
  }

  /**
   * Sends email
   * @param data the template data to be renderd with themplate
   * @param template html template
   * @returns  response from Send in Blue after the the email is successfully sent
   */
  private async sendEmail(data: any, template: string) {
    var ctx = this;
    await ctx.verify();

    try {
      let html: string = await ejs.renderFile(
        path.join(__dirname, "../", template),
        data
      )

      ctx.options.html = html;

      //console.log("html data ======================>", ctx.options.html);

      return await ctx.transporter.sendMail(ctx.options)
    }
    catch (error: any) {
      console.log("Error Not caught");
      throw new Error(`Email not sent Error: ${error}`);
    }
  }
}

Object.seal(Email);
