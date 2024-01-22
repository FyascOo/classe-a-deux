import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="relative m-3">
      <label class="absolute ml-2 -translate-y-3 bg-white scale-75 px-2">
        <ng-content></ng-content>
      </label>
      <input [formControl]="value" type="text" [formControl]="value" class="border border-black rounded-lg  w-full  p-2 font-sans" />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() set reset(value: string) {
    this.value.patchValue(value);
  }
  value = new FormControl('', { nonNullable: true });
  @Output() valueChanges = this.value.valueChanges;
}
