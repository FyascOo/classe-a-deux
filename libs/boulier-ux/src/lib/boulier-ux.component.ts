import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ButtonCircleComponent,
  ContainerComponent,
} from '@classe-a-deux/shared-ui';

@Component({
  selector: 'classe-a-deux-boulier-ux',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ButtonCircleComponent],
  template: `
    <ui-container>
      boulier
      <div class="flex justify-start w-full">
        <ui-button-circle></ui-button-circle>
        <ui-button-circle></ui-button-circle>
        <ui-button-circle></ui-button-circle>
        <ui-button-circle></ui-button-circle>
        <ui-button-circle></ui-button-circle>
        <ui-button-circle></ui-button-circle>
        <ui-button-circle></ui-button-circle>
        <ui-button-circle></ui-button-circle>
        <ui-button-circle></ui-button-circle>
        <ui-button-circle></ui-button-circle>
      </div>
    </ui-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoulierUXComponent {}
