import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface Message extends SMTPTransport.Options, Mail.Options {}

export const MessageService = {
  async deliveryMessage({ host, port, ...msg }: Message) {
    const transport = nodemailer.createTransport({ host, port });

    await transport.sendMail(msg);
  },
};
