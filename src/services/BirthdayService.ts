import { OurDate } from "./../domain/OurDate";
import { SendGreetingsService } from "./SendGreetingsService";
import { EmailServer } from "../infrastructure/EmailServer";
import { GetEmployeesService } from "./GetEmployeesService";

export class BirthdayService {
  greetBirthdayEmployees(
    fileName: string,
    ourDate: OurDate,
    emailServer: EmailServer
  ) {
    const employees = GetEmployeesService.getEmployees(fileName, ourDate);

    for (const employee of employees) {
      if (employee.isBirthday(ourDate)) {
        SendGreetingsService.sendGreetings(employee, emailServer);
      }
    }
  }
}
