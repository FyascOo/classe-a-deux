import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ButtonComponent,
  CheckboxComponent,
  ContainerComponent,
  InputComponent,
} from '@classe-a-deux/shared-ui';
import {
  LIST_TABLE,
  addSelectedTable,
  removeSelectedTable,
  selectSelectedTable,
  selectTime,
  updateTime,
} from '@classe-a-deux/test';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'classe-a-deux-home',
  standalone: true,
  imports: [
    AsyncPipe,
    ContainerComponent,
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
  ],
  template: `
    <ui-container>
      <p>Nous allons tester tes connaissances des tables de multiplication</p>
      <p>Tu auras {{ time$ | async }} secondes par calcul.</p>
      <p>A la fin, télécharge ou imprime le tableau récapitulatif</p>
      <br />
      <ui-button (action)="navigate()">Commencer le test</ui-button>
    </ui-container>

    <ui-container>
      <h2 class="w-full italic">Paramètres</h2>
      <div class="flex justify-around items-center w-full m-5">
        <span class="m-3">Nombre de secondes</span>
        <ui-input
          [reset]="(time$ | async)!"
          (valueChanges)="updateTime($event)"></ui-input>
      </div>
      <div class="flex justify-around w-full">
        <div class="flex-col">
          @if(selectedTable$ | async; as select) { @for (selectedTable of
          [1,2,3,4,5]; track $index) {
          <ui-checkbox
            [check]="select.includes(selectedTable)"
            (action)="checked($event, selectedTable)">
            Table {{ selectedTable }}
          </ui-checkbox>
          } }
        </div>
        <div class="flex-col">
          @if(selectedTable$ | async; as select) { @for (selectedTable of
          [6,7,8,9,10]; track $index) {
          <ui-checkbox
            [check]="select.includes(selectedTable)"
            (action)="checked($event, selectedTable)">
            Table {{ selectedTable }}
          </ui-checkbox>
          } }
        </div>
      </div>
    </ui-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  #router = inject(Router);
  #store = inject(Store);
  time$ = this.#store.select(selectTime).pipe(map(time => `${time}`));
  selectedTable$ = this.#store.select(selectSelectedTable);

  ngOnInit(): void {
    this.#store.dispatch(
      updateTime({
        time: localStorage.getItem('time') ? +localStorage.getItem('time')! : 5,
      })
    );
    if (localStorage.getItem('selectedTable')) {
      JSON.parse(localStorage.getItem('selectedTable')!).forEach(
        (selectedTable: number) =>
          this.#store.dispatch(addSelectedTable({ selectedTable }))
      );
    } else {
      [2, 3, 4, 5, 6, 7, 8, 9].forEach(selectedTable =>
        this.#store.dispatch(addSelectedTable({ selectedTable }))
      );
    }
  }

  navigate() {
    this.#router.navigate(['/test']);
  }

  updateTime(time: string) {
    this.#store.dispatch(updateTime({ time: +time }));
  }

  checked(check: boolean, selectedTable: number) {
    if (check) {
      this.#store.dispatch(addSelectedTable({ selectedTable }));
    } else {
      this.#store.dispatch(removeSelectedTable({ selectedTable }));
    }
  }
}
