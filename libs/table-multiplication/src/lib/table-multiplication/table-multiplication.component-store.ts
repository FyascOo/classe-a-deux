import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
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
} from 'rxjs';
import { Multiplication, TABLES } from './table-multiplication.constante';

export interface TableMultiplicationState {
  tables: Multiplication[];
  result: string;
  count: number;
  indicateur: Indicateur;
  counter: number;
}

export interface Indicateur {
  icon: 'task_alt' | 'error' | '...';
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
  icon: '...',
  color: 'text-black',
};

export const initialTableMultiplicationState: TableMultiplicationState = {
  tables: TABLES,
  result: '',
  count: 0,
  indicateur: indicateurWaiting,
  counter: 5,
};

@Injectable()
export class TableMultiplicationComponentStore extends ComponentStore<TableMultiplicationState> {
  #router = inject(Router);
  readonly tables$ = this.select((state) => state.tables);
  readonly result$ = this.select((state) => state.result);
  readonly count$ = this.select((state) => state.count);
  readonly indicateur$ = this.select((state) => state.indicateur);
  readonly counter$ = this.select((state) => state.counter);

  constructor() {
    super(initialTableMultiplicationState);
  }

  readonly updateIndicateur = this.updater((state, indicateur: Indicateur) => ({
    ...state,
    indicateur,
  }));

  readonly validate: any = this.effect<void>((source$) =>
    source$.pipe(
      switchMap(() => combineLatest([this.tables$, this.result$, this.count$])),
      map(([tables, result, count]) => tables[count].result === +result),
      tap((valid) =>
        this.updateIndicateur(valid ? indicateurValid : indicateurError)
      ),
      debounceTime(1000),
      tap(() => this.patchState(({ count }) => ({ count: count + 1 }))),
      tap(() => this.patchState({ result: '' })),
      tap(() => this.updateIndicateur(indicateurWaiting)),
      tap(() => this.patchState({ counter: 5 })),
      tap(() => this.count()),
      take(1),
      repeat()
    )
  );

  readonly count = this.effect<void>((source$) =>
    source$.pipe(
      switchMap(() =>
        interval(1000).pipe(
          tap(() =>
            this.patchState(({ counter }) => ({ counter: counter - 1 }))
          ),
          filter((index) => index === 4),
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
            console.log(tables.length, count);
            if (tables.length === count) {
              this.#router.navigate(['result']);
            }
          })
        )
      )
    )
  );
}
