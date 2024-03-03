import { IHandler } from '@foblex/core';
import { GenerateScheduleRequest } from './generate-schedule-request';
import { ISchedule } from '../i-schedule';
import { IScheduleCell } from '../i-schedule-cell';
import { IScheduleColumn } from '../i-schedule-column';
import { IScheduleRow } from '../i-schedule-row';
import { IScheduleItem } from '../i-schedule-item';
import { generateId } from '../../generate-id';
import { randomInt } from '../../random-int';
import { Injectable } from '@angular/core';
import { ClientService } from '../../../client.service';
import { ServiceService } from '../../../service.service';
import { EmployeeService } from '../../../employee.service';

@Injectable({
  providedIn: 'root'
})
export class GenerateScheduleHandler implements IHandler<GenerateScheduleRequest, ISchedule> {

  constructor(
      private clientService: ClientService,
      private serviceService: ServiceService,
      private employeeService: EmployeeService
  ) {
  }

  public handle(request: GenerateScheduleRequest): ISchedule {

    const columns: IScheduleColumn[] = this.generateColumns(request);
    const rows: IScheduleRow[] = this.generateRows(request, columns);

    return {
      startDate: request.startDate,
      timeInterval: request.timeInterval,
      columns,
      rows,
    };
  }

  private generateColumns(request: GenerateScheduleRequest): IScheduleColumn[] {
    const result: IScheduleColumn[] = [];

    for (let i = 0; i < request.days; i++) {
      const date = new Date(request.startDate);
      date.setDate(date.getDate() + i);
      const isToday = this.isToday(date);
      result.push({ id: date, isToday: isToday });
    }

    return result;
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  private generateRows(request: GenerateScheduleRequest, columns: IScheduleColumn[]): IScheduleRow[] {
    const result: IScheduleRow[] = [];
    let currentTime = new Date(request.startTime);

    while (currentTime < request.endTime) {
      const nextTime = addMinutes(currentTime, request.timeInterval);
      const cells: IScheduleCell[] = columns.map(() => ({
        id: generateId("cell"),
        items: this.generateItems(request)
      }));
      result.push({ id: currentTime, cells });
      currentTime = nextTime;
    }

    return result;
  }

  private generateItems(request: GenerateScheduleRequest): IScheduleItem[] {
    const clients = this.clientService.getList();
    const services = this.serviceService.getList();
    const employees = this.employeeService.getList();

    const count = randomInt(0, 2);
    let result: IScheduleItem[] = [];

    for (let i = 0; i < count; i++) {
      const client = clients[ randomInt(0, clients.length - 1) ];
      const service = services[ randomInt(0, services.length - 1) ];
      const employee = employees[ randomInt(0, employees.length - 1) ];
      result.push({
        id: generateId("item"),
        client: client,
        service: service,
        employee: employee
      });
    }

    return result;
  }
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}



