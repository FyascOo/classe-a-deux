import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
  combineLatest,
  debounceTime,
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
}

export const initialTableMultiplicationState: TableMultiplicationState = {
  tables: TABLES,
  result: '',
  count: 0,
  indicateur: '',
};

@Injectable()
export class TableMultiplicationStore extends ComponentStore<TableMultiplicationState> {
  readonly tables$ = this.select((state) => state.tables);
  readonly result$ = this.select((state) => state.result);
  readonly count$ = this.select((state) => state.count);
  readonly indicateur$ = this.select((state) => state.indicateur);

  constructor() {
    super(initialTableMultiplicationState);
  }

  readonly updateIndicateur = this.updater((state, indicateur: string) => ({
    ...state,
    indicateur,
  }));

  readonly validate = this.effect<void>((source$) =>
    source$.pipe(
      switchMap(() => combineLatest([this.tables$, this.result$, this.count$])),
      map(([tables, result, count]) => tables[count].result === +result),
      tap((valid) => this.updateIndicateur(valid ? 'OK' : 'PAS OK')),
      debounceTime(1000),
      tap(() => this.patchState(({ count }) => ({ count: count + 1 }))),
      tap(() => this.patchState({ result: '' })),
      tap(() => this.updateIndicateur('')),
      take(1),
      repeat()
    )
  );
}
