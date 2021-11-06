import { Employee } from "./../domain/Employee";
import { EmailServer } from "../infrastructure/EmailServer";
import { MessageService } from "./MessageService";

export const SendGreetingsService = {
  sendGreetings(employee: Employee, emailServer: EmailServer) {
    const recipient = employee.getEmail();
    const body = "Happy Birthday, dear %NAME%!".replace(
      "%NAME%",
      employee.getFirstName()
    );
    const subject = "Happy Birthday!";
    this.sendMessage(emailServer, "sender@here.com", subject, body, recipient);
  },

  async sendMessage(
    emailServer: EmailServer,
    sender: string,
    subject: string,
    body: string,
    recipient: string
  ) {
    const message = {
      emailServer,
      from: sender,
      to: [recipient],
      subject,
      text: body,
    };

    MessageService.deliveryMessage(message);
  },
};
