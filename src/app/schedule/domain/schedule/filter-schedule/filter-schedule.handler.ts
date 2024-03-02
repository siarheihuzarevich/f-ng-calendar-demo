import { IHandler } from '@foblex/core';
import { FilterScheduleRequest } from './filter-schedule-request';
import { ISchedule } from '../i-schedule';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterScheduleHandler implements IHandler<FilterScheduleRequest, ISchedule> {

  public handle(request: FilterScheduleRequest): ISchedule {

    const result: ISchedule = JSON.parse(JSON.stringify(request.schedule));

    result.rows.forEach((row) => {
      row.cells.forEach((cell) => {
        cell.items = cell.items.filter((item) => request.employees.includes(item.employee.id));
      });
    });

    return result;
  }
}




