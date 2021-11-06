import { EmailService, Email } from "../infrastructure/EmailService";

export interface Message {
  email: Email;
}

export const MessageService = {
  async deliveryMessage(email: Email) {
    await EmailService.sendEmail(email);
  },
};
