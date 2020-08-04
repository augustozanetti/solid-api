import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

import { IMailProvider, IMessage } from "../IMailProvider";

export class MailTrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
  }

  async sendMail({
    to: { email: address, name },
    from,
    body: html,
    subject,
  }: IMessage) {
    await this.transporter.sendMail({
      to: {
        address,
        name,
      },
      from: {
        name: from.name,
        address: from.email,
      },
      subject,
      html,
    });
  }
}
