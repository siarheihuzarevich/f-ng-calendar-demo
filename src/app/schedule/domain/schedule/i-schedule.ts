import { IScheduleRow } from './i-schedule-row';
import { IScheduleColumn } from './i-schedule-column';

export interface ISchedule {

  startDate: Date;

  timeInterval: number;

  columns: IScheduleColumn[];

  rows: IScheduleRow[];
}
