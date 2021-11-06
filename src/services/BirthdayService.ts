import { OurDate } from "./../domain/OurDate";
import { SendGreetingsService } from "./SendGreetingsService";
import { EmailServer } from "../infrastructure/EmailServer";
import { FindBirthdayEmployeesService } from "./FindBirthdayEmployeesService";

export class BirthdayService {
  greetBirthdayEmployees(
    fileName: string,
    ourDate: OurDate,
    emailServer: EmailServer
  ) {
    const employees = FindBirthdayEmployeesService.findBirthdayEmployees(
      fileName,
      ourDate
    );

    for (const employee of employees) {
      if (employee.isBirthday(ourDate)) {
        SendGreetingsService.sendGreetings(employee, emailServer);
      }
    }
  }
}
