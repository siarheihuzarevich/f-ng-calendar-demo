import { Injectable } from '@angular/core';
import { ISchedule } from './domain/schedule/i-schedule';
import { GenerateScheduleHandler } from './domain/schedule/generate-schedule/generate-schedule.handler';
import { GenerateScheduleRequest } from './domain/schedule/generate-schedule/generate-schedule-request';
import { FilterScheduleHandler } from './domain/schedule/filter-schedule/filter-schedule.handler';
import { FilterScheduleRequest } from './domain/schedule/filter-schedule/filter-schedule-request';
import { ChangeItemCellHandler } from './domain/schedule/change-item-cell/change-item-cell.handler';
import { ChangeItemCellRequest } from './domain/schedule/change-item-cell/change-item-cell-request';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(
    private generateScheduleHandler: GenerateScheduleHandler,
    private filterScheduleHandler: FilterScheduleHandler,
    private changeItemCellHandler: ChangeItemCellHandler
  ) {
  }

  public getDetails(date: Date = new Date()): ISchedule {
    return this.generateScheduleHandler.handle(
      new GenerateScheduleRequest(
        date,
        7,
        60
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
}
