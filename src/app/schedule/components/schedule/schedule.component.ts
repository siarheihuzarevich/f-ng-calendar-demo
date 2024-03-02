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
}
