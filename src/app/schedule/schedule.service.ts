import { Injectable } from '@angular/core';
import { ISchedule } from './domain/schedule/i-schedule';
import { GenerateScheduleHandler } from './domain/schedule/generate-schedule/generate-schedule.handler';
import { GenerateScheduleRequest } from './domain/schedule/generate-schedule/generate-schedule-request';
import { FilterScheduleHandler } from './domain/schedule/filter-schedule/filter-schedule.handler';
import { FilterScheduleRequest } from './domain/schedule/filter-schedule/filter-schedule-request';
import { ChangeItemCellHandler } from './domain/schedule/change-item-cell/change-item-cell.handler';
import { ChangeItemCellRequest } from './domain/schedule/change-item-cell/change-item-cell-request';
import { TimeService } from './time.service';
import { INewScheduleItem } from './domain/i-new-schedule-item';
import { IScheduleItem } from './domain/schedule/i-schedule-item';
import { ClientService } from './client.service';
import { ServiceService } from './service.service';
import { EmployeeService } from './employee.service';
import { generateId } from './domain/generate-id';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
      private generateScheduleHandler: GenerateScheduleHandler,
      private filterScheduleHandler: FilterScheduleHandler,
      private changeItemCellHandler: ChangeItemCellHandler,
      private clientService: ClientService,
      private serviceService: ServiceService,
      private employeeService: EmployeeService,
      private timeService: TimeService
  ) {
  }

  public getDetails(date: Date = new Date()): ISchedule {
    return this.generateScheduleHandler.handle(
        new GenerateScheduleRequest(
            date,
            7,
            this.timeService.interval,
            this.timeService.startTime,
            this.timeService.endTime
        )
    );
  }

  public filter(employees: string[], schedule: ISchedule): ISchedule {
    return this.filterScheduleHandler.handle(
        new FilterScheduleRequest(
            employees,
            schedule
        )
    );
  }

  public changeItemCell(itemId: string, oldCellId: string, newCellId: string, schedule: ISchedule): void {
    this.changeItemCellHandler.handle(
        new ChangeItemCellRequest(
            itemId,
            oldCellId,
            newCellId,
            schedule
        )
    );
  }

  public getScheduleItem(item: INewScheduleItem): IScheduleItem {
    return {
      id: generateId('schedule-item'),
      employee: this.employeeService.getList().find(x => x.id === item.employee)!,
      client: this.clientService.getList().find(x => x.id === item.client)!,
      service: this.serviceService.getList().find(x => x.id === item.service)!
    }

  }
}
