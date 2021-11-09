import { Employee } from "@domain/Employee";

export interface GreetingsSender {
  sendGreetingsToEmployee: (employee: Employee) => void;
}
