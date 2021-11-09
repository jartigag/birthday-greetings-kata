import { OurDate } from "./../domain/OurDate";
import { SendGreetingsService } from "./SendGreetingsService";
import { EmailServer } from "../infrastructure/EmailServer";
import { Employee } from "../domain/Employee";

export class BirthdayService {
  greetBirthdayEmployees(
    employees: Employee[],
    ourDate: OurDate,
    emailServer: EmailServer
  ) {
    for (const employee of employees) {
      if (employee.isBirthday(ourDate)) {
        SendGreetingsService.sendGreetings(employee, emailServer);
      }
    }
  }
}
