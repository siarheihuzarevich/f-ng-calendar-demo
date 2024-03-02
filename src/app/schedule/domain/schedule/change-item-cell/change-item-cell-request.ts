import { ISchedule } from '../i-schedule';

export class ChangeItemCellRequest {

  constructor(
    public itemId: string,
    public oldCellId: string,
    public newCellId: string,
    public schedule: ISchedule
  ) {
  }
}
