import { Employee } from "@domain/Employee";
import { OurDate } from "./OurDate";

export interface EmployeesRepository {
  getEmployeesByBirthDate: (fileName: string, birthDate: OurDate) => Employee[];
}
