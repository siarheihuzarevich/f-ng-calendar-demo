import {
  ChangeDetectionStrategy,
  Component, OnInit,
} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
import { EmployeeService } from '../../employee.service';
import { ClientService } from '../../client.service';
import { ServiceService } from '../../service.service';
import { TimeService } from '../../time.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'create-schedule-item',
  templateUrl: './create-schedule-item.component.html',
  styleUrl: './create-schedule-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
  imports: [ MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormField, MatSelect, MatOption, MatLabel, DatePipe, ReactiveFormsModule, MatDatepicker, MatDatepickerToggle, MatIcon, MatDatepickerInput, MatInput, MatSuffix ],
})
export class CreateScheduleItemComponent implements OnInit {

  public employees = this.employeeService.getList();
  public clients = this.clientService.getList();
  public services = this.servicesService.getList();
  public times = this.timeService.getList();

  public form: FormGroup | undefined

  constructor(
      public dialogRef: MatDialogRef<CreateScheduleItemComponent>,
      private employeeService: EmployeeService,
      private clientService: ClientService,
      private servicesService: ServiceService,
      private timeService: TimeService
  ) {
  }

  public ngOnInit(): void {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      employee: new FormControl(null, Validators.required),
      client: new FormControl(null, Validators.required),
      service: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    });
  }

  public onSubmit(): void {
    if (this.form?.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
