import { Injectable } from '@angular/core';
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
import { TABLES, Table } from './table-multiplication.constante';

export interface TableMultiplicationState {
  tables: Table[];
  result: string;
  count: number;
  indicateur: string;
  counter: number;
}

export const initialTableMultiplicationState: TableMultiplicationState = {
  tables: TABLES,
  result: '',
  count: 0,
  indicateur: '',
  counter: 5,
};

@Injectable()
export class TableMultiplicationStore extends ComponentStore<TableMultiplicationState> {
  readonly tables$ = this.select((state) => state.tables);
  readonly result$ = this.select((state) => state.result);
  readonly count$ = this.select((state) => state.count);
  readonly indicateur$ = this.select((state) => state.indicateur);
  readonly counter$ = this.select((state) => state.counter);

  constructor() {
    super(initialTableMultiplicationState);
  }

  readonly updateIndicateur = this.updater((state, indicateur: string) => ({
    ...state,
    indicateur,
  }));

  readonly validate: any = this.effect<void>((source$) =>
    source$.pipe(
      switchMap(() => combineLatest([this.tables$, this.result$, this.count$])),
      map(([tables, result, count]) => tables[count].result === +result),
      tap((valid) => this.updateIndicateur(valid ? 'OK' : 'PAS OK')),
      debounceTime(1000),
      tap(() => this.patchState(({ count }) => ({ count: count + 1 }))),
      tap(() => this.patchState({ result: '' })),
      tap(() => this.updateIndicateur('')),
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
}
