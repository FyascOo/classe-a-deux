import { createReducer, on } from '@ngrx/store';
import { Multiplication, TABLES } from './table-multiplication.constante';
import { tableChanges } from './table-multiplication.actions';

export interface TableMultiplicationState {
  tables: Multiplication[];
}

export const init: TableMultiplicationState = {
  tables: [...TABLES],
};

export const tableMultiplicationReducer = createReducer(
  init,
  on(tableChanges, (state, { answer }) => ({ ...state, tables: state.tables }))
);
