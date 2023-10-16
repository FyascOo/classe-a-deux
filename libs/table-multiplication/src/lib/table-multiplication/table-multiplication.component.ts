import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContainerComponent, InputComponent } from '@classe-a-deux/shared-ui';
import { BehaviorSubject, Subject, combineLatest, tap } from 'rxjs';
import { TABLES } from './table-multiplication.constante';

@Component({
  selector: 'tm-table-multiplication',
  standalone: true,
  imports: [CommonModule, ContainerComponent, InputComponent],
  template: `
    <ui-container>
      <ng-container *ngFor="let table of tables; let i = index">
        <ng-container *ngIf="i === (count$ | async)">
          {{ table.question }} {{ result$ | async }}
        </ng-container>
      </ng-container>
      <ui-input (valueChanges)="result$.next($event)"></ui-input>
    </ui-container>
  `,
})
export class TableMultiplicationComponent {
  tables = TABLES;
  result$ = new Subject<string>();
  count$ = new BehaviorSubject(0);
  updateCount$ = combineLatest([this.result$, this.count$])
    .pipe(
      tap(([result, count]) => {
        if (TABLES[count].result === +result) {
          this.count$.next(this.count$.value + 1);
        }
      })
    )
    .subscribe();
}
