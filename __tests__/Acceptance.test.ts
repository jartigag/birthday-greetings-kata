import { OurDate } from "../src/domain/OurDate";
import { BirthdayService } from "../src/services/BirthdayService";
import { messagesSent, startMailhog, stopMailHog } from "./mailhog";
import flushPromises from "flush-promises";
import { EmailServer } from "../src/infrastructure/EmailServer";

describe("Acceptance", () => {
  const SMTP_PORT = 1025;
  const SMTP_URL = "127.0.0.1";
  let service: BirthdayService;

  beforeEach(() => {
    startMailhog();

    service = new BirthdayService();
  });

  afterEach(() => {
    stopMailHog();
  });

  it("base scenario", async () => {
    const emailServer: EmailServer = { host: SMTP_URL, port: SMTP_PORT };
    service.greetBirthdayEmployees(
      "employee_data.txt",
      new OurDate("2008/10/08"),
      emailServer
    );
    await flushPromises();

    const messages = await messagesSent();
    expect(messages.length).toEqual(1);
    const message = messages[0];
    expect(message.Content.Body).toEqual("Happy Birthday, dear John!");
    expect(message.Content.Headers.Subject[0]).toEqual("Happy Birthday!");
    const tos = message.Content.Headers.To;
    expect(tos.length).toEqual(1);
    expect(tos[0]).toEqual("john.doe@foobar.com");
  });

  it("will not send emails when nobodys birthday", async () => {
    const emailServer: EmailServer = { host: SMTP_URL, port: SMTP_PORT };
    service.greetBirthdayEmployees(
      "employee_data.txt",
      new OurDate("2008/01/01"),
      emailServer
    );
    await flushPromises();

    const messages = await messagesSent();
    expect(messages.length).toEqual(0);
  });
});
