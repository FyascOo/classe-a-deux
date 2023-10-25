import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-[#587c7f] h-0.5 w-[300px]"></div>
    <div class="mt-1">Ce site est créé par Classe à deux</div>
  `,
  styles: [
    `
      :host {
        background-color: #6ba0a5;
        padding: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
