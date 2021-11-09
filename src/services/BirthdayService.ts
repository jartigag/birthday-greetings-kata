import { OurDate } from "@domain/OurDate";
import { CSVEmployeesRepository } from "@infrastructure/CSVEmployeesRepository"; //TODO: change by @domain/EmployeesRepository
import { SMTPGreetingsSender } from "@infrastructure/SMTPGreetingsSender"; //TODO: change by @domain/GreetingsSender

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
