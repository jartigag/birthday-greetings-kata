import fs from "fs";
import path from "path";
import { Employee } from "./../domain/Employee";
import { OurDate } from "./../domain/OurDate";
import { SendGreetingsService } from "./SendGreetingsService";
import { EmailServer } from "../infrastructure/EmailServer";

export class BirthdayService {
  greetBirthdayEmployees(
    fileName: string,
    ourDate: OurDate,
    emailServer: EmailServer
  ) {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../../resources/${fileName}`),
      "UTF-8"
    );

    // split the contents by new line
    const lines = data.split(/\r?\n/);
    lines.shift();

    // print all lines
    lines.forEach((line) => {
      const employeeData = line.split(", ");
      const employee = new Employee(
        employeeData[1],
        employeeData[0],
        employeeData[2],
        employeeData[3]
      );
      if (employee.isBirthday(ourDate)) {
        SendGreetingsService.sendGreetings(employee, emailServer);
      }
    });
  }
}
