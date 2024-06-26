import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, OnDestroy, ViewChild,
} from '@angular/core';
import { ActionPanelComponent } from '../action-panel/action-panel.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { IActionPanelValue } from '../action-panel/i-action-panel-value';
import { BehaviorSubject, Subscription } from 'rxjs';
import { INewScheduleItem } from '../../domain/i-new-schedule-item';

@Component({
  selector: 'schedule-overview',
  templateUrl: './schedule-overview.component.html',
  styleUrl: './schedule-overview.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ActionPanelComponent,
    ScheduleComponent
  ]
})
export class ScheduleOverviewComponent implements AfterViewInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  private value = new BehaviorSubject<IActionPanelValue | null>(null);

  @ViewChild(ScheduleComponent)
  public scheduleComponent: ScheduleComponent | undefined;

  @ViewChild(ActionPanelComponent)
  public actionPanelComponent: ActionPanelComponent | undefined;

  public ngAfterViewInit(): void {
    this.subscriptions.add(this.subscribeOnValueChange());
  }

  private subscribeOnValueChange(): Subscription {
    return this.value.subscribe((value) => {
      if (value) {
        this.scheduleComponent?.setValue(value);
      }
    });
  }

  public actionPanelValueChange(value: IActionPanelValue): void {
    this.value.next(value);
  }

  public nextWeek(): void {
    const date = new Date(this.value.getValue()!.startDate);
    date.setDate(date.getDate() + 7);
    this.actionPanelComponent?.dateChanged(date);
  }

  public prevWeek(): void {
    const date = new Date(this.value.getValue()!.startDate);
    date.setDate(date.getDate() - 7);
    this.actionPanelComponent?.dateChanged(date);
  }

  public onItemCreated(item: INewScheduleItem): void {
    this.scheduleComponent?.createItem(item);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
