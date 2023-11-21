import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ButtonCircleComponent,
  ContainerComponent,
} from '@classe-a-deux/shared-ui';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'classe-a-deux-boulier-ux',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ButtonCircleComponent],
  template: `
    <ui-container>
      <div *ngFor="let y of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" class="flex w-full">
        <ui-button-circle
          *ngFor="let x of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
        ></ui-button-circle>
      </div>
    </ui-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoulierUXComponent {
  one$ = new BehaviorSubject(true);
  two$ = new BehaviorSubject(true);
  changeOne() {
    this.one$.next(!this.one$.value);
  }
  changeTwo() {
    this.two$.next(!this.two$.value);
  }
}
