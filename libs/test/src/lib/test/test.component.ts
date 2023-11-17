import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ButtonCircleComponent,
  ButtonComponent,
  ContainerComponent,
  InputComponent,
  ProgressBarComponent,
} from '@classe-a-deux/shared-ui';
import { Store } from '@ngrx/store';
import { TableMultiplicationComponentStore } from './test.component-store';

@Component({
  selector: 'tm-test',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    InputComponent,
    ButtonComponent,
    ProgressBarComponent,
    ButtonCircleComponent,
  ],
  providers: [TableMultiplicationComponentStore],
  template: `
    <ui-progress-bar
      [progress]="(progressCounter$ | async)!"
      [color]="true"
    ></ui-progress-bar>
    <ui-container (keyup.enter)="validate()">
      <ng-container *ngFor="let table of tables$ | async; let i = index">
        <div class="flex items-center" *ngIf="i === (count$ | async)">
          <span *ngIf="(indicateur$ | async)?.icon === ''"
            >{{ table.question }} {{ answer$ | async }}</span
          >
          <span
            *ngIf="(indicateur$ | async)?.icon !== ''"
            [ngClass]="(indicateur$ | async)?.color"
            >{{ table.question }} {{ table.result }}</span
          >
          <span
            *ngIf="indicateur$ | async as indicateur"
            [ngClass]="indicateur.color"
            class="material-symbols-outlined ml-5"
          >
            {{ indicateur.icon }}</span
          >
        </div>
      </ng-container>
      <ui-input
        [reset]="(answer$ | async)!"
        (valueChanges)="answerChanges($event)"
        >Réponse</ui-input
      >
      <div class="flex">
        <ui-button-circle
          *ngFor="let value of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]"
          (emitValue)="addAnswer(value)"
          >{{ value }}</ui-button-circle
        >
      </div>
      <ui-button class="mt-2" (action)="validate()">Valider</ui-button>
    </ui-container>
    <ui-progress-bar [progress]="(progressTest$ | async)!"></ui-progress-bar>
  `,
})
export class TableMultiplicationComponent {
  #storeComponent = inject(TableMultiplicationComponentStore);
  #store = inject(Store);
  tables$ = this.#storeComponent.tables$;
  answer$ = this.#storeComponent.answer$;
  count$ = this.#storeComponent.count$;
  indicateur$ = this.#storeComponent.indicateur$;
  progressCounter$ = this.#storeComponent.progressCounter$;
  progressTest$ = this.#storeComponent.progressTest$;

  answerChanges(answer: string) {
    this.#storeComponent.patchState({ answer });
  }

  addAnswer(a: number) {
    this.#storeComponent.patchState(({ answer }) => ({
      answer: `${answer}${a}`,
    }));
  }

  validate() {
    this.#storeComponent.validate();
  }
}
