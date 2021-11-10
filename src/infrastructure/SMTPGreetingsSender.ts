import { Employee } from "@domain/Employee";
// import { GreetingsSender } from "@domain/GreetingsSender";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export interface Message extends SMTPTransport.Options, Mail.Options {}

// TODO: support this.sendMessage using the GreetingsSender interface
// export const SMTPGreetingsSender: GreetingsSender = {
export const SMTPGreetingsSender = {
  sendGreetingsToEmployee: (employee: Employee): void => {
    const recipient = employee.getEmail();
    const body = "Happy Birthday, dear %NAME%!".replace(
      "%NAME%",
      employee.getFirstName()
    );
    const subject = "Happy Birthday!";
    SMTPGreetingsSender.sendMessage(
      "127.0.0.1", // FIXME
      1025, // FIXME
      "sender@here.com",
      subject,
      body,
      recipient
    );
  },

  async sendMessage(
    smtpHost: string,
    smtpPort: number,
    sender: string,
    subject: string,
    body: string,
    recipient: string
  ) {
    const message = {
      host: smtpHost,
      port: smtpPort,
      from: sender,
      to: [recipient],
      subject,
      text: body,
    };

    // this.deliveryMessage(message);
    nodemailer
      .createTransport({ host: "127.0.0.1", port: 1025 })
      //                 FIXME: ^^^^^^^^^ ,       ^^^^
      .sendMail(message);
  },
};
