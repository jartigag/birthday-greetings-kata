import { Employee } from "@domain/Employee";

export interface EmployeesRepository {
  loadEmployees: (fileName: string) => Employee[];
}
