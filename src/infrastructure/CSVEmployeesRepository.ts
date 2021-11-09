import fs from "fs";
import path from "path";
import { Employee } from "@domain/Employee";
import { EmployeesRepository } from "@domain/EmployeesRepository";

export const CSVEmployeesRepository: EmployeesRepository = {
  loadEmployees(fileName: string): Employee[] {
    const data = fs.readFileSync(
      path.resolve(__dirname, `../../resources/${fileName}`),
      "UTF-8"
    );

    // split the contents by new line
    const lines = data.split(/\r?\n/);
    lines.shift();

    // create employee
    const employees = lines
      .map((line) => line.split(", "))
      .map(
        (employeeData) =>
          new Employee(
            employeeData[1],
            employeeData[0],
            employeeData[2],
            employeeData[3]
          )
      );

    return employees;
  },
};
