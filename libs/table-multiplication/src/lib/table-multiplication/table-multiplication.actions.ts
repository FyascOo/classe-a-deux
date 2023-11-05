import { createAction, props } from '@ngrx/store';

export const getTables = createAction('[Table multiplicatino test] Get Table');
export const tableChanges = createAction(
  '[Table multiplication test] Answer multiplication',
  props<{ answer: number }>()
);
