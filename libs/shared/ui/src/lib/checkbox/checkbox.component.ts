import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [],
  template: `
    <div class="flex items-center mb-4">
      <input
        id="default-checkbox"
        type="checkbox"
        (click)="checked()"
        [checked]="check"
        class="w-4 h-4 text-[#6ba0a5] bg-[#6ba0a5] border-[#6ba0a5] rounded focus:ring-[#6ba0a5]" />
      <label
        for="default-checkbox"
        class="ms-2 text-sm font-medium text-gray-900">
        <ng-content></ng-content>
      </label>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
  @Input() check = false;
  @Output() action = new EventEmitter<boolean>();

  checked() {
    this.check = !this.check;
    this.action.emit(this.check);
  }
}
