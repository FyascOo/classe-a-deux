import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
} from '@classe-a-deux/shared-ui';
import { Store } from '@ngrx/store';
import { TableMultiplicationComponentStore } from './table-multiplication.component-store';

@Component({
  selector: 'tm-table-multiplication',
  standalone: true,
  imports: [CommonModule, ContainerComponent, InputComponent, ButtonComponent],
  providers: [TableMultiplicationComponentStore],
  template: `
    <ui-container (keyup.enter)="validate()">
      <ng-container *ngFor="let table of tables$ | async; let i = index">
        <ng-container *ngIf="i === (count$ | async)">
          {{ table.question }} {{ answer$ | async }}
          <span>{{ counter$ | async }}</span>
          <span
            *ngIf="indicateur$ | async as indicateur"
            [ngClass]="indicateur.color"
            class="material-symbols-outlined"
          >
            {{ indicateur.icon }}</span
          >
        </ng-container>
      </ng-container>
      <ui-input
        [reset]="(answer$ | async)!"
        (valueChanges)="answerChanges($event)"
      ></ui-input>
      <ui-button (action)="validate()">Valider</ui-button>
    </ui-container>
  `,
})
export class TableMultiplicationComponent {
  #storeComponent = inject(TableMultiplicationComponentStore);
  #store = inject(Store);
  tables$ = this.#storeComponent.tables$;
  answer$ = this.#storeComponent.answer$;
  count$ = this.#storeComponent.count$;
  indicateur$ = this.#storeComponent.indicateur$;
  counter$ = this.#storeComponent.counter$;

  answerChanges(answer: string) {
    this.#storeComponent.patchState({ answer });
  }

  validate() {
    this.#storeComponent.validate();
  }
}
