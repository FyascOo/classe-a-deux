import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
export interface StyleCircle {
  hover?: string;
  hoverBorder?: string;
  hoverText?: string;
  focus?: string;
  backgroundColor?: string;
}
@Component({
  selector: 'ui-button-circle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      class="m-1 border border-black focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
      [ngClass]="_style"
      (click)="action.emit()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCircleComponent {
  @Input() set style({
    hover,
    hoverBorder,
    hoverText,
    focus,
    backgroundColor,
  }: StyleCircle) {
    this._style = `${hover ?? '[hover:bg-[#6ba0a5]'} ${
      hoverBorder ?? 'hover:border-[#6ba0a5]'
    } ${hoverText ?? 'hover:text-white'} ${focus ?? 'focus:ring-[#6ba0a5]'} ${
      backgroundColor ?? 'bg-white'
    }`;
  }
  @Output() action = new EventEmitter();
  _style =
    'hover:bg-[#6ba0a5] hover:border-[#6ba0a5] hover:text-white focus:ring-[#6ba0a5] bg-white';
}
