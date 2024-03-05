import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'master',
  templateUrl: './master.component.html',
  styleUrl: './master.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterOutlet,
    ToolbarComponent
  ]
})
export class MasterComponent {
}
