import { createReducer, on } from '@ngrx/store';

import { tableChanges, nomChanges } from './test.actions';
import { Multiplication, TABLES } from './test.constante';

export interface TableMultiplicationState {
  tables: Multiplication[];
  nom: string
}

export const init: TableMultiplicationState = {
  tables: [...TABLES],
  nom: ''
};

export const tableMultiplicationReducer = createReducer(
  init,
  on(tableChanges, (state, { table }) => ({
    ...state,
    tables: state.tables.map((t) =>
      t.id === table.id ? { ...t, answer: table.answer } : t
    ),
  })),
  on(nomChanges, (state, { nom }) => ({ ...state, nom }))
);
