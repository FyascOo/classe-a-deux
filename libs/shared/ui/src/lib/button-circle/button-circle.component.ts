import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-button-circle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="m-1 border border-black hover:bg-[#6ba0a5] hover:border-[#6ba0a5] hover:text-white focus:ring-4 focus:outline-none focus:ring-[#6ba0a5] font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
      (click)="action.emit()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCircleComponent {
  @Output() action = new EventEmitter();
}
