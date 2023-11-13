import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent, ContainerComponent } from '@classe-a-deux/shared-ui';
import { Multiplication, selectTables } from '@classe-a-deux/test';
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
    <div #container class="w-full">
      <div class="flex flex-row justify-between w-full">
        <div class="flex flex-col">
          <ng-container *ngFor="let table of tables; let i = index">
            <span *ngIf="t2(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
              {{ table.question }} {{ table.result }}
              {{ correct(table) ? 'O' : 'X' }}
            </span></ng-container
          >
        </div>
        <div class="flex flex-col">
          <ng-container *ngFor="let table of tables; let i = index">
            <span *ngIf="t3(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
              {{ table.question }} {{ table.result }}
              {{ correct(table) ? 'O' : 'X' }}
            </span></ng-container
          >
        </div>
        <div class="flex flex-col">
          <ng-container *ngFor="let table of tables; let i = index">
            <span *ngIf="t4(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
              {{ table.question }} {{ table.result }}
              {{ correct(table) ? 'O' : 'X' }}
            </span></ng-container
          >
        </div>
        <div class="flex flex-col">
          <ng-container *ngFor="let table of tables; let i = index">
            <span *ngIf="t5(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
              {{ table.question }} {{ table.result }}
              {{ correct(table) ? 'O' : 'X' }}
            </span></ng-container
          >
        </div>
      </div>
      <div class="flex flex-row justify-between w-full">
        <div class="flex flex-col">
          <ng-container *ngFor="let table of tables; let i = index">
            <span *ngIf="t6(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
              {{ table.question }} {{ table.result }}
              {{ correct(table) ? 'O' : 'X' }}
            </span></ng-container
          >
        </div>
        <div class="flex flex-col">
          <ng-container *ngFor="let table of tables; let i = index">
            <span *ngIf="t7(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
              {{ table.question }} {{ table.result }}
              {{ correct(table) ? 'O' : 'X' }}
            </span></ng-container
          >
        </div>
        <div class="flex flex-col">
          <ng-container *ngFor="let table of tables; let i = index">
            <span *ngIf="t8(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
              {{ table.question }} {{ table.result }}
              {{ correct(table) ? 'O' : 'X' }}
            </span></ng-container
          >
        </div>
        <div class="flex flex-col">
          <ng-container *ngFor="let table of tables; let i = index">
            <span *ngIf="t9(i)" [ngClass]="tenth(i) ? 'mb-2' : null">
              {{ table.question }} {{ table.result }}
              {{ correct(table) ? 'O' : 'X' }}
            </span></ng-container
          >
        </div>
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
  doc = new jsPDF('l', 'pt', 'a2');
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

  t2(i: number) {
    return i + 1 <= 10;
  }

  t3(i: number) {
    return i + 1 > 10 && i + 1 <= 20;
  }
  t4(i: number) {
    return i + 1 > 20 && i + 1 <= 30;
  }

  t5(i: number) {
    return i + 1 > 30 && i + 1 <= 40;
  }
  t6(i: number) {
    return i + 1 > 40 && i + 1 <= 50;
  }

  t7(i: number) {
    return i + 1 > 50 && i + 1 <= 60;
  }
  t8(i: number) {
    return i + 1 > 60 && i + 1 <= 70;
  }

  t9(i: number) {
    return i + 1 > 70;
  }
}
