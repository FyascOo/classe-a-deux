import { createReducer, on } from '@ngrx/store';
import { tableChanges } from './table-multiplication.actions';
import { Multiplication, TABLES } from './table-multiplication.constante';

export interface TableMultiplicationState {
  tables: Multiplication[];
}

export const init: TableMultiplicationState = {
  tables: [...TABLES],
};

export const tableMultiplicationReducer = createReducer(
  init,
  on(tableChanges, (state, { table }) => ({
    ...state,
    tables: state.tables.map((t) =>
      t.id === table.id ? { ...t, answer: table.answer } : t
    ),
  }))
);
