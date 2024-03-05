import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'header[toolbar]',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ]
})
export class ToolbarComponent {


}
