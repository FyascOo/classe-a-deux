import { createAction, props } from '@ngrx/store';
import { Multiplication } from './table-multiplication.constante';

export const tableChanges = createAction(
  '[Table multiplication test] Answer multiplication',
  props<{ table: Multiplication }>()
);
