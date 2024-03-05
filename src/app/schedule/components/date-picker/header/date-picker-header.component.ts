import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Inject, OnDestroy, OnInit
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatCalendar } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'date-picker-header',
  templateUrl: './date-picker-header.component.html',
  styleUrl: './date-picker-header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon
  ]
})
export class DatePickerHeaderComponent<TDate> implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  public get label(): string {
    return this._dateAdapter
        .format(this.calendarComponent.activeDate, this._dateFormats.display.monthYearLabel);
  }

  constructor(
      private calendarComponent: MatCalendar<TDate>,
      private _dateAdapter: DateAdapter<TDate>,
      @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
      private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  public ngOnInit(): void {
    this.subscriptions.add(
        this.subscribeOnCalendarStateChanges()
    );
  }

  private subscribeOnCalendarStateChanges(): Subscription {
    return this.calendarComponent.stateChanges.subscribe(() => {
      this.changeDetectorRef.markForCheck()
    });
  }

  public previousMonth(): void {
    this.calendarComponent.activeDate = this._dateAdapter.addCalendarMonths(this.calendarComponent.activeDate, -1);
  }

  public nextMonth() {
    this.calendarComponent.activeDate = this._dateAdapter.addCalendarMonths(this.calendarComponent.activeDate, 1);
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
