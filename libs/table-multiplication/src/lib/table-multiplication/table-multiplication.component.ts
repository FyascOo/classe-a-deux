import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ButtonComponent,
  ContainerComponent,
  InputComponent,
} from '@classe-a-deux/shared-ui';
import { BehaviorSubject } from 'rxjs';
import { TABLES } from './table-multiplication.constante';

@Component({
  selector: 'tm-table-multiplication',
  standalone: true,
  imports: [CommonModule, ContainerComponent, InputComponent, ButtonComponent],
  template: `
    <ui-container (keyup.enter)="validate()">
      <ng-container *ngFor="let table of tables; let i = index">
        <ng-container *ngIf="i === (count$ | async)">
          {{ table.question }} {{ result$ | async }} {{ indicateur }}
        </ng-container>
      </ng-container>
      <ui-input (valueChanges)="result$.next($event)"></ui-input>
      <ui-button (action)="validate()">Valider</ui-button>
    </ui-container>
  `,
})
export class TableMultiplicationComponent {
  tables = TABLES;
  result$ = new BehaviorSubject<string>('');
  count$ = new BehaviorSubject(0);
  indicateur = '';

  validate() {
    this.indicateur = 'pas ok';
    if (TABLES[this.count$.value].result === +this.result$.value) {
      this.indicateur = 'ok';
      this.count$.next(this.count$.value + 1);
    }
  }
}
