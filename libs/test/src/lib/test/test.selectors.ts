import { createSelector } from '@ngrx/store';
import { TableMultiplicationState } from './test.reducers';

export interface AppState {
  tablesMultiplicationState: TableMultiplicationState;
}

export const selectTableMultiplication = (state: AppState) =>
  state.tablesMultiplicationState;

export const selectTables = createSelector(
  selectTableMultiplication,
  (state: TableMultiplicationState) => state.tables
);
