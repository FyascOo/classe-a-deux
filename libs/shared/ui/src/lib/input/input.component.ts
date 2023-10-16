import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="relative m-3">
      <label class="absolute ml-2 -translate-y-3 bg-white scale-75 px-2">
        Réponse
      </label>
      <input
        [formControl]="value"
        type="text"
        [formControl]="value"
        class="border border-black rounded-lg  w-full  p-2.5"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  value = new FormControl();
  @Output() valueChanges = this.value.valueChanges;
}
