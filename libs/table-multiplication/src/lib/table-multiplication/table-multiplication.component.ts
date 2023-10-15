import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerComponent, InputComponent } from '@classe-a-deux/shared-ui';
import { Subject } from 'rxjs';
import { TABLES } from './table-multiplication.constante';

@Component({
  selector: 'tm-table-multiplication',
  standalone: true,
  imports: [CommonModule, ContainerComponent, InputComponent],
  template: `
    <ui-container>
      <ng-container *ngFor="let table of tables; let i = index">
        <ng-container *ngIf="i === count"
          >{{ table.question }} {{ result$ | async }}</ng-container
        >
      </ng-container>
      <ui-input (valueChanges)="valueChanges($event)"></ui-input>
    </ui-container>
  `,
})
export class TableMultiplicationComponent {
  tables = TABLES;
  result$ = new Subject();
  count = 0;
  valueChanges(anwser: number) {
    this.result$.next(anwser);
    this.count++;
  }
}
