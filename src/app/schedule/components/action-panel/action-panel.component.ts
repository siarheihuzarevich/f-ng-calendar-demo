import {
  ChangeDetectionStrategy,
  Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild,
} from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IEmployee } from '../../domain/employee/i-employee';
import { EmployeeService } from '../../employee.service';
import { startWith, Subscription } from 'rxjs';
import { IActionPanelValue } from './i-action-panel-value';

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
  providers: [ provideNativeDateAdapter() ],
  imports: [
    MatCard,
    MatCalendar,
    MatCheckbox,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ActionPanelComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();

  public employees: IEmployee[] = [];

  public startDate: Date = new Date();

  public form: FormGroup | undefined;

  @ViewChild(MatCalendar)
  public calendar: MatCalendar<Date> | undefined;

  @Output()
  public valueChange: EventEmitter<IActionPanelValue> = new EventEmitter<IActionPanelValue>();

  constructor(
    private employeeService: EmployeeService
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
      startDate: new FormControl(this.startDate),
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
    this.startDate = date;
    this.form?.get('startDate')?.setValue(date);
    this.calendar!.updateTodaysDate();
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
