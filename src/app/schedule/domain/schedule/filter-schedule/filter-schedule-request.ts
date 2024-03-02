import { ISchedule } from '../i-schedule';

export class FilterScheduleRequest {

  constructor(
    public employees: string[],
    public schedule: ISchedule
  ) {
  }
}
