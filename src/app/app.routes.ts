import { Routes } from '@angular/router';
import { MasterComponent } from './shared/master/master.component';
import { ScheduleOverviewComponent } from './schedule/components/overview/schedule-overview.component';

export const routes: Routes = [ {
  path: '',
  component: MasterComponent,
  children: [
    {
      path: '',
      component: ScheduleOverviewComponent
    }
  ]
} ];
