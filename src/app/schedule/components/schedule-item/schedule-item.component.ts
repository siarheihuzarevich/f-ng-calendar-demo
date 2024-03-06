import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
} from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatButton, MatIconButton } from '@angular/material/button';
import { IScheduleItem } from '../../domain/schedule/i-schedule-item';
import { MatIcon } from '@angular/material/icon';
import { FDragHandleDirective } from '@foblex/ng-drag-grid';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'schedule-item',
  templateUrl: './schedule-item.component.html',
  styleUrl: './schedule-item.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardContent,
    MatButton,
    FDragHandleDirective,
    MatIconButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger
  ]
})
export class ScheduleItemComponent {

  @Input()
  public viewModel: IScheduleItem | undefined;

  constructor(
      private elementReference: ElementRef<HTMLElement>
  ) {
  }

  public editScheduleItem(): void {
    alert('edit');
  }

  public deleteScheduleItem(): void {
    alert('delete');
  }
}
