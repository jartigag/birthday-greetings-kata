import { OurDate } from "@domain/OurDate";
import { EmployeesRepository } from "@domain/EmployeesRepository";
import { SMTPGreetingsSender } from "@infrastructure/SMTPGreetingsSender";

export class BirthdayService {
  employeesRepository: EmployeesRepository;

  constructor(employeesRepository: EmployeesRepository) {
    this.employeesRepository = employeesRepository;
  }

  sendGreetings(
    fileName: string,
    ourDate: OurDate,
    smtpHost: string,
    smtpPort: number
  ) {
    const birthdayEmployees = this.employeesRepository.getEmployeesByBirthDate(
      fileName,
      ourDate
    );
    birthdayEmployees.forEach((employee) => {
      SMTPGreetingsSender.sendGreetingsToEmployee(employee);
    });
  }
}
