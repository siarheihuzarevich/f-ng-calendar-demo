import {
  ChangeDetectionStrategy,
  Component, forwardRef, Input, ViewChild,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerHeaderComponent } from './header/date-picker-header.component';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ],
  imports: [ MatCalendar ]
})
export class DatePickerComponent implements ControlValueAccessor {

  public header = DatePickerHeaderComponent;

  @ViewChild(MatCalendar)
  public calendar: MatCalendar<Date> | undefined;

  private _value: Date | null = null;

  @Input()
  public set value(value: Date | null) {
    this._value = value || new Date();
    if (this.calendar) {
      this.calendar.updateTodaysDate();
    }
  }

  public get value(): Date | null {
    return this._value;
  }

  private onChange: any = () => {
  };
  private onTouch: any = () => {
  };

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  public writeValue(value: Date | null): void {
    if (value !== this.value) {
      this.value = value;
    }
  }

  public changeValue(value: Date | null): void {
    this.value = value;
    this.onChange(this.value);
    this.onTouch();
  }
}
