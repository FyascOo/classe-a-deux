import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonCircleComponent, ButtonComponent, ContainerComponent, InputComponent, ProgressBarComponent } from '@classe-a-deux/shared-ui';
import { take } from 'rxjs';
import { TableMultiplicationComponentStore } from './test.component-store';

@Component({
  selector: 'tm-test',
  standalone: true,
  imports: [CommonModule, ContainerComponent, InputComponent, ButtonComponent, ProgressBarComponent, ButtonCircleComponent],
  providers: [TableMultiplicationComponentStore],
  template: `
    <ui-progress-bar [progress]="(progressCounter$ | async)!" [color]="true"></ui-progress-bar>
    <ui-container (keyup.enter)="validate()">
      <ng-container *ngFor="let table of tables$ | async; let i = index">
        <div class="flex items-center md:text-5xl text-2xl" *ngIf="i === (count$ | async)">
          <span *ngIf="(indicateur$ | async)?.icon === ''">{{ table.question }} {{ answer$ | async }}</span>
          <span *ngIf="(indicateur$ | async)?.icon !== ''" class="md:text-5xl text-2xl" [ngClass]="(indicateur$ | async)?.color">
            {{ table.question }} {{ table.result }}
          </span>
          <span
            *ngIf="indicateur$ | async as indicateur"
            [ngClass]="indicateur.color"
            class="material-symbols-outlined ml-5 md:text-4xl text-2xl">
            {{ indicateur.icon }}
          </span>
        </div>
      </ng-container>
      <ui-input [reset]="(answer$ | async)!" (valueChanges)="answerChanges($event)">Réponse</ui-input>
      <div class="flex flex-wrap">
        <ui-button-circle *ngFor="let value of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" (action)="addAnswer(value)">{{ value }}</ui-button-circle>
        <ui-button-circle class="material-symbols-outlined" (action)="removeAnswer()">delete</ui-button-circle>
      </div>
      <ui-button class="mt-2" (action)="validate()">Valider</ui-button>
    </ui-container>
    <ui-progress-bar [progress]="(progressTest$ | async)!"></ui-progress-bar>
  `,
})
export class TableMultiplicationComponent {
  #storeComponent = inject(TableMultiplicationComponentStore);
  tables$ = this.#storeComponent.tables$;
  answer$ = this.#storeComponent.answer$;
  count$ = this.#storeComponent.count$;
  indicateur$ = this.#storeComponent.indicateur$;
  progressCounter$ = this.#storeComponent.progressCounter$;
  progressTest$ = this.#storeComponent.progressTest$;
  disabledValidate$ = this.#storeComponent.disabledValidate$;

  answerChanges(answer: string) {
    this.#storeComponent.patchState({ answer });
  }

  addAnswer(a: number) {
    this.#storeComponent.patchState(({ answer }) => ({
      answer: `${answer}${a}`,
    }));
  }

  removeAnswer() {
    this.#storeComponent.patchState({
      answer: '',
    });
  }

  validate() {
    this.disabledValidate$.pipe(take(1)).subscribe(disabled => {
      if (!disabled) {
        this.#storeComponent.validate();
      }
    });
  }
}
