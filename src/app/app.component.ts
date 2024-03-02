import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScheduleRootComponent } from './schedule/components/root/schedule-root.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet, ScheduleRootComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
