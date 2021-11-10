import { Employee } from "@domain/Employee";
import { GreetingsSender } from "@domain/GreetingsSender";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface Message extends SMTPTransport.Options, Mail.Options {}

export const SMTPGreetingsSender: GreetingsSender = {
  sendGreetingsToEmployee: (employee: Employee) => {
    const recipient = employee.getEmail();
    const body = "Happy Birthday, dear %NAME%!".replace(
      "%NAME%",
      employee.getFirstName()
    );
    const subject = "Happy Birthday!";

    const message = {
      host: "127.0.0.1",
      port: 1025,
      from: "sender@here.com",
      to: [recipient],
      subject,
      text: body,
    };

    SMTPGreetingsSender.sendMessage(message);
  },

  async sendMessage({ host, port, ...msg }: Message) {
    const transport = nodemailer.createTransport({
      host: "127.0.0.1",
      port: 1025,
    });
    await transport.sendMail(msg);
  },
};
