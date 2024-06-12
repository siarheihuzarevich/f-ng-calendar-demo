import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, EventEmitter, Output,
} from '@angular/core';
import { ISchedule } from '../../domain/schedule/i-schedule';
import {
  FBodyCellComponent,
  FBodyComponent, FBodyRowComponent,
  FCellItemComponent, FDragGridComponent,
  FHeaderCellComponent,
  FHeaderComponent,
  FHeaderRowComponent, FMoveEvent
} from '@foblex/ng-drag-grid';
import { MatIcon } from '@angular/material/icon';
import { ScheduleItemComponent } from '../schedule-item/schedule-item.component';
import { ScheduleService } from '../../schedule.service';
import { MatIconButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { IActionPanelValue } from '../action-panel/i-action-panel-value';
import { INewScheduleItem } from '../../domain/i-new-schedule-item';

@Component({
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FDragGridComponent,
    FHeaderComponent,
    FHeaderRowComponent,
    FHeaderCellComponent,
    FBodyComponent,
    FBodyRowComponent,
    FBodyCellComponent,
    FCellItemComponent,
    MatIcon,
    ScheduleItemComponent,
    MatIconButton,
    DatePipe
  ]
})
export class ScheduleComponent {

  private originalModel: ISchedule | undefined;

  public viewModel: ISchedule | undefined;

  private value: IActionPanelValue | undefined;

  @Output()
  public prev: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public next: EventEmitter<void> = new EventEmitter<void>();

  constructor(
      private scheduleApiService: ScheduleService,
      private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  public setValue(value: IActionPanelValue): void {
    this.value = value;
    if (!this.originalModel || this.originalModel.startDate !== value.startDate) {
      this.originalModel = this.scheduleApiService.getDetails(value.startDate);
    }
    this.viewModel = this.scheduleApiService.filter(value.employees, this.originalModel);

    this.changeDetectorRef.detectChanges();
  }

  public onItemMovedToCell(event: FMoveEvent): void {
    this.scheduleApiService.changeItemCell(event.items[ 0 ].itemId, event.items[ 0 ].currentCellId, event.toCellId, this.originalModel!);
    this.viewModel = this.scheduleApiService.filter(this.value!.employees, this.originalModel!);

    this.changeDetectorRef.detectChanges();
  }

  public createItem(item: INewScheduleItem): void {
    const column = this.findColumn(item);
    if (column !== undefined) {
      const row = this.findRow(item);
      if (!this.originalModel?.rows[ row! ].cells[ column ].items) {
        this.originalModel!.rows[ row! ].cells[ column ].items = [];
      }
      this.originalModel!.rows[ row! ].cells[ column ].items.push(this.scheduleApiService.getScheduleItem(item));
    }
    this.viewModel = this.scheduleApiService.filter(this.value!.employees, this.originalModel!);

    this.changeDetectorRef.detectChanges();
  }

  private findColumn(item: INewScheduleItem): number | undefined {
    return this.originalModel!.columns.findIndex((x) => x.id.getDate() === item.date.getDate());
  }

  private findRow(item: INewScheduleItem): number | undefined {
    return this.originalModel!.rows.findIndex((x) => {
      return x.id.getHours() === item.time.getHours() && x.id.getMinutes() === item.time.getMinutes();
    });
  }

  public onDeleteItem(rowIndex: number, cellId: string, itemId: string): void {
    const cell = this.originalModel?.rows[rowIndex].cells.find((x) => x.id === cellId)!;
    cell.items = cell.items.filter((x) => x.id !== itemId);
    this.viewModel = this.scheduleApiService.filter(this.value!.employees, this.originalModel!);

    this.changeDetectorRef.detectChanges();
  }
}
