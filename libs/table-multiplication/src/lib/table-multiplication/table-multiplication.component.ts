import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
} from '@classe-a-deux/shared-ui';
import { TableMultiplicationStore } from './table-multiplication.store';

@Component({
  selector: 'tm-table-multiplication',
  standalone: true,
  imports: [CommonModule, ContainerComponent, InputComponent, ButtonComponent],
  providers: [TableMultiplicationStore],
  template: `
    <ui-container (keyup.enter)="validate()">
      <ng-container *ngFor="let table of tables$ | async; let i = index">
        <ng-container *ngIf="i === (count$ | async)">
          {{ table.question }} {{ result$ | async }} {{ indicateur$ | async }}
        </ng-container>
      </ng-container>
      <ui-input
        [reset]="(result$ | async)!"
        (valueChanges)="resultChanges($event)"
      ></ui-input>
      <ui-button (action)="validate()">Valider</ui-button>
    </ui-container>
  `,
})
export class TableMultiplicationComponent {
  #store = inject(TableMultiplicationStore);
  tables$ = this.#store.tables$;
  result$ = this.#store.result$;
  count$ = this.#store.count$;
  indicateur$ = this.#store.indicateur$;

  resultChanges(result: string) {
    this.#store.patchState({ result });
  }

  validate() {
    this.#store.validate();
  }
}
