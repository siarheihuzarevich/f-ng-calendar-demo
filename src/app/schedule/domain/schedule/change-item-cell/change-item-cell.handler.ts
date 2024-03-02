import { IHandler } from '@foblex/core';
import { ChangeItemCellRequest } from './change-item-cell-request';
import { ISchedule } from '../i-schedule';
import { Injectable } from '@angular/core';
import { IScheduleCell } from '../i-schedule-cell';

@Injectable({
  providedIn: 'root'
})
export class ChangeItemCellHandler implements IHandler<ChangeItemCellRequest, void> {

  public handle(request: ChangeItemCellRequest): void {
    const fromCell = this.findCell(request.schedule, request.oldCellId);
    const toCell = this.findCell(request.schedule, request.newCellId);

    this.transferItem(request.itemId, fromCell!, toCell!);
  }

  private findCell(schedule: ISchedule, cellId: string): IScheduleCell | undefined {
    let result: IScheduleCell | undefined;
    schedule.rows.forEach((row) => {
      row.cells.forEach((cell) => {
        if (cell.id === cellId) {
          result = cell;
        }
      });
    });
    if (!result) {
      throw new Error('Cell not found');
    }

    return result;
  }

  private transferItem(itemId: string, fromCell: IScheduleCell, toCell: IScheduleCell): void {
    const item = fromCell.items.find((x) => x.id === itemId);

    if (!item) {
      throw new Error('Item not found');
    }

    fromCell.items = fromCell.items.filter((x) => x.id !== itemId);
    toCell.items.push(item);
  }
}




