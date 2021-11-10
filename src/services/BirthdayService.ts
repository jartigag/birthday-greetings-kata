import { OurDate } from "@domain/OurDate";
import { EmployeesRepository } from "@domain/EmployeesRepository";
import { GreetingsSender } from "@domain/GreetingsSender";

export class BirthdayService {
  employeesRepository: EmployeesRepository;
  greetingsSender: GreetingsSender;

  constructor(
    employeesRepository: EmployeesRepository,
    greetingsSender: GreetingsSender
  ) {
    this.employeesRepository = employeesRepository;
    this.greetingsSender = greetingsSender;
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
      this.greetingsSender.sendGreetingsToEmployee(employee);
    });
  }
}
