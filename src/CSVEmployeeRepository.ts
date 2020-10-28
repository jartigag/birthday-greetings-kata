import { OurDate } from "./OurDate"
import fs from "fs"
import path from "path"
import { Employee } from "./Employee"

export class CSVEmployeeRepository{
  getBirthdayEmployees(fileName: string, ourDate: OurDate){
    const data = fs.readFileSync(path.resolve(__dirname, `../resources/${fileName}`), 'UTF-8')

    // split the contents by new line
    const lines = data.split(/\r?\n/)
    lines.shift()

    return lines.map(line => {
      const employeeData = line.split(', ')
      return new Employee(employeeData[1], employeeData[0], employeeData[2], employeeData[3])
    }).filter(employee => employee.isBirthday(ourDate))
  }
}
