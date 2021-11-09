import { OurDate } from "@domain/OurDate";
import { CSVEmployeesRepository } from "@infrastructure/CSVEmployeesRepository";
import { SMTPGreetingsSender } from "@infrastructure/SMTPGreetingsSender";

export class BirthdayService {
  sendGreetings(
    fileName: string,
    ourDate: OurDate,
    smtpHost: string,
    smtpPort: number
  ) {
    const birthdayEmployees = CSVEmployeesRepository.getEmployeesByBirthDate(
      fileName,
      ourDate
    );
    birthdayEmployees.forEach((employee) => {
      SMTPGreetingsSender.sendGreetingsToEmployee(employee);
    });
  }
}
