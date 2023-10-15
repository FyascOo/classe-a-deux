import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-container',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="relative flex flex-col w-full items-center justify-center">
<ng-content></ng-content>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {}
