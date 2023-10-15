import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  template: `
  <header class="relative flex w-full items-center justify-between bg-white py-2 shadow-lg mb-5">
    <div class="flex w-full flex-wrap items-center justify-between px-3">
      Table multiplication
    </div>
</header>
  `,
})
export class HeaderComponent {}
