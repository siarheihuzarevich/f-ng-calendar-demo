import {
  ChangeDetectionStrategy,
  Component, EventEmitter, OnDestroy, OnInit, Output,
} from '@angular/core';
import { MatCard, MatCardHeader } from '@angular/material/card';
import { MatCalendar, MatCalendarBody } from '@angular/material/datepicker';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IEmployee } from '../../domain/employee/i-employee';
import { EmployeeService } from '../../employee.service';
import { startWith, Subscription } from 'rxjs';
import { IActionPanelValue } from './i-action-panel-value';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { MatButton } from '@angular/material/button';

interface IFormValue {
  startDate: Date;
  employees: boolean[];
}

@Component({
  selector: 'action-panel',
  templateUrl: './action-panel.component.html',
  styleUrl: './action-panel.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCalendar,
    MatCheckbox,
    FormsModule,
    ReactiveFormsModule,
    MatCardHeader,
    MatCalendarBody,
    DatePickerComponent,
    MatButton
  ]
})
export class ActionPanelComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  public employees: IEmployee[] = [];

  public form: FormGroup | undefined;

  @Output()
  public valueChange: EventEmitter<IActionPanelValue> = new EventEmitter<IActionPanelValue>();

  constructor(
    private employeeService: EmployeeService,
  ) {
  }

  public ngOnInit(): void {
    this.employees = this.employeeService.getList();
    this.form = this.buildForm();
    this.subscriptions.add(this.subscribeOnFormChanges(this.form));
  }

  private buildForm(): FormGroup {
    const employees = this.employees.map((x) => {
      return new FormControl(true);
    });
    return new FormGroup({
      startDate: new FormControl(new Date()),
      employees: new FormArray([
        ...employees
      ])
    });
  }

  private subscribeOnFormChanges(form: FormGroup): Subscription {
    return form.valueChanges.pipe(startWith(form.value)).subscribe((value) => {
      this.generateSchedule(value);
    });
  }

  private generateSchedule(value: IFormValue): void {
    const result = {
      startDate: value.startDate,
      employees: this.employees.filter((x, index) => value.employees[index]).map((x) => x.id)
    }
    this.valueChange.emit(result);
  }

  public dateChanged(date: Date): void {
    this.form?.get('startDate')?.setValue(date);
  }

  public createScheduleItem(): void {
    alert('create');
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
