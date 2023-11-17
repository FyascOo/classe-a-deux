import { createAction, props } from '@ngrx/store';
import { Multiplication } from './test.constante';

export const tableChanges = createAction(
  '[Table multiplication test] Answer multiplication',
  props<{ table: Multiplication }>()
);

export const nomChanges = createAction('[Nom] Nom changes', props<{nom: string}>())
