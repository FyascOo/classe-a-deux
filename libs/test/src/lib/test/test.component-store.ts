import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  debounceTime,
  filter,
  interval,
  map,
  repeat,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { tableChanges } from './test.actions';
import { Multiplication, TABLES } from './test.constante';
import { AppState } from './test.selectors';

export interface TableMultiplicationState {
  tables: Multiplication[];
  answer: string;
  count: number;
  indicateur: Indicateur;
  progressCounter: number;
  progressTest: number;
}

export interface Indicateur {
  icon: 'task_alt' | 'error' | '';
  color: 'text-green-700' | 'text-orange-900' | 'text-black';
}

export const indicateurValid: Indicateur = {
  icon: 'task_alt',
  color: 'text-green-700',
};
export const indicateurError: Indicateur = {
  icon: 'error',
  color: 'text-orange-900',
};
export const indicateurWaiting: Indicateur = {
  icon: '',
  color: 'text-black',
};

export const initialTableMultiplicationState: TableMultiplicationState = {
  tables: TABLES,
  answer: '',
  count: 0,
  indicateur: indicateurWaiting,
  progressCounter: 100,
  progressTest: 0,
};

@Injectable()
export class TableMultiplicationComponentStore extends ComponentStore<TableMultiplicationState> {
  #router = inject(Router);
  #store = inject(Store<AppState>);
  readonly tables$ = this.select((state) => state.tables);
  readonly answer$ = this.select((state) => state.answer);
  readonly count$ = this.select((state) => state.count);
  readonly indicateur$ = this.select((state) => state.indicateur);
  readonly progressCounter$ = this.select((state) => state.progressCounter);
  readonly progressTest$ = this.select((state) => state.progressTest);

  constructor() {
    super(initialTableMultiplicationState);
    this.progress();
    this.navigate();
  }

  readonly updateIndicateur = this.updater((state, indicateur: Indicateur) => ({
    ...state,
    indicateur,
  }));

  readonly validate: any = this.effect<void>((source$) =>
    source$.pipe(
      withLatestFrom(this.tables$, this.answer$, this.count$),
      tap(([_, tables, answer, count]) =>
        this.#store.dispatch(
          tableChanges({ table: { ...tables[count], answer: +answer } })
        )
      ),
      tap(([_, tables, answer, count]) =>
        this.patchState(({ progressTest }) => ({
          progressTest: progressTest + 100 / tables.length,
        }))
      ),
      map(([_, tables, answer, count]) => tables[count]?.result === +answer),
      tap((valid) =>
        this.updateIndicateur(valid ? indicateurValid : indicateurError)
      ),
      debounceTime(2000),
      tap(() => this.patchState(({ count }) => ({ count: count + 1 }))),
      tap(() => this.patchState({ answer: '' })),
      tap(() => this.updateIndicateur(indicateurWaiting)),
      tap(() => this.patchState({ progressCounter: 100 })),
      tap(() => this.progress()),
      take(1),
      repeat()
    )
  );

  readonly progress = this.effect<void>((source$) =>
    source$.pipe(
      switchMap(() =>
        interval(25).pipe(
          tap(() =>
            this.patchState(({ progressCounter }) => ({
              progressCounter: progressCounter - 1,
            }))
          ),
          filter((interval) => interval === 200),
          tap(() => this.validate())
        )
      ),
      take(1),
      repeat()
    )
  );

  readonly navigate = this.effect<void>((source$) =>
    source$.pipe(
      switchMap(() =>
        combineLatest([this.tables$, this.count$]).pipe(
          tap(([tables, count]) => {
            if (tables.length === count) {
              this.#router.navigate(['result']);
            }
          })
        )
      )
    )
  );
}
