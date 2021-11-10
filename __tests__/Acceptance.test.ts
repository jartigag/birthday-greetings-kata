import { OurDate } from "@domain/OurDate";
import { BirthdayService } from "@services/BirthdayService";
import { messagesSent, startMailhog, stopMailHog } from "./mailhog";
import flushPromises from "flush-promises";
import { CSVEmployeesRepository } from "@infrastructure/CSVEmployeesRepository";

describe("Acceptance", () => {
  const SMTP_PORT = 1025;
  const SMTP_URL = "127.0.0.1";
  const FILENAME = "employee_data.txt";
  let service: BirthdayService;

  beforeEach(() => {
    startMailhog();

    service = new BirthdayService(CSVEmployeesRepository);
  });

  afterEach(() => {
    stopMailHog();
  });

  it("base scenario", async () => {
    service.sendGreetings(
      FILENAME,
      new OurDate("2008/10/08"),
      SMTP_URL,
      SMTP_PORT
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
    service.sendGreetings(
      "employee_data.txt",
      new OurDate("2008/01/01"),
      SMTP_URL,
      SMTP_PORT
    );
    await flushPromises();

    const messages = await messagesSent();
    expect(messages.length).toEqual(0);
  });
});
