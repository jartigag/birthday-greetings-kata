import fs from "fs";
import path from "path";
import { Employee } from "@domain/Employee";

export class EmployeesRepository {
  loadEmployees(fileName: string) {
    const employees: Employee[] = [];

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
      employees.push(
        new Employee(
          employeeData[1],
          employeeData[0],
          employeeData[2],
          employeeData[3]
        )
      );
    });

    return employees;
  }
}
