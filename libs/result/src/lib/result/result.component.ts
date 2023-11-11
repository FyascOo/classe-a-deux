import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, ContainerComponent } from '@classe-a-deux/shared-ui';
import {
  Multiplication,
  selectTables,
} from '@classe-a-deux/table-multiplication';
import { Store } from '@ngrx/store';
import { jsPDF } from 'jspdf';
import { map } from 'rxjs';

@Component({
  selector: 'classe-a-deux-result',
  standalone: true,
  imports: [CommonModule, ContainerComponent, ButtonComponent],
  template: `<ui-container *ngIf="tables$ | async as tables">
    <ui-button class="mb-5" (action)="save(container)"
      ><span class="material-symbols-outlined"> download </span></ui-button
    >
    <div #container class="flex flex-row w-full">
      <div class="flex flex-col flex-1">
        <ng-container *ngFor="let table of tables; let i = index">
          <span *ngIf="thirty(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
            {{ table.question }} {{ table.result }}
            {{ correct(table) ? 'O' : 'X' }}
          </span></ng-container
        >
      </div>
      <div class="flex flex-col flex-1">
        <ng-container *ngFor="let table of tables; let i = index">
          <span *ngIf="sixty(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
            {{ table.question }} {{ table.result }}
            {{ correct(table) ? 'O' : 'X' }}
          </span></ng-container
        >
      </div>
      <div class="flex flex-col flex-1">
        <ng-container *ngFor="let table of tables; let i = index">
          <span *ngIf="ninety(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
            {{ table.question }} {{ table.result }}
            {{ correct(table) ? 'O' : 'X' }}
          </span></ng-container
        >
      </div>
    </div>
  </ui-container>`,
  styles: [
    `
      .flex-1 {
        flex: 1;
      }

      .mb-2 {
        margin-bottom: 1rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultComponent {
  #store = inject(Store);
  doc = new jsPDF('p', 'pt', 'a3');
  tables$ = this.#store
    .select(selectTables)
    .pipe(map((tables) => [...tables].sort((a, b) => (a.id > b.id ? 1 : -1))));

  save(container: HTMLElement) {
    this.doc.html(container, { callback: () => this.doc.save('resultat.pdf') });
  }

  correct(multiplication: Multiplication) {
    return multiplication.result === multiplication.answer;
  }

  tenth(i: number) {
    return (i + 1) % 10 === 0;
  }

  thirty(i: number) {
    return i + 1 <= 30;
  }

  sixty(i: number) {
    return i + 1 > 30 && i + 1 <= 60;
  }

  ninety(i: number) {
    return i + 1 > 60;
  }
}
