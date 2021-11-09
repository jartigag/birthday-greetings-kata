import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { EmailServer } from "@infrastructure/EmailServer";

export interface Email extends SMTPTransport.Options, Mail.Options {
  emailServer: EmailServer;
}

export const EmailService = {
  async sendEmail({ emailServer, ...msg }: Email) {
    const transport = nodemailer.createTransport(emailServer);

    await transport.sendMail(msg);
  },
};
