import { IScheduleCell } from './i-schedule-cell';

export interface IScheduleRow {

  id: Date;

  cells: IScheduleCell[];
}
