import { Injectable } from '@angular/core';
import { GenerateEmployeesHandler } from './domain/employee/generate-employees/generate-employees.handler';
import { IEmployee } from './domain/employee/i-employee';
import { GenerateEmployeesRequest } from './domain/employee/generate-employees/generate-employees-request';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private entities: IEmployee[] = new GenerateEmployeesHandler().handle(
    new GenerateEmployeesRequest()
  );

  constructor() { }

  public getList(): IEmployee[] {
    return this.entities;
  }
}
