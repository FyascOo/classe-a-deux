import { createSelector } from '@ngrx/store';
import { TableMultiplicationState } from './table-multiplication.reducers';

export interface AppState {
  tablesMultiplicationState: TableMultiplicationState;
}

export const selectTableMultiplication = (state: AppState) =>
  state.tablesMultiplicationState;

export const selectTable = createSelector(
  selectTableMultiplication,
  (state: TableMultiplicationState) => state.tables
);
