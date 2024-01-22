import { createActionGroup, createFeature, createReducer, props, on } from '@ngrx/store';
import { Multiplication, TABLES } from './test.constante';

export interface TableMultiplicationState {
  tables: Multiplication[];
  nom: string;
}

export const init: TableMultiplicationState = {
  tables: [...TABLES],
  nom: '',
};

const testActions = createActionGroup({
  source: 'Test Action',
  events: { 'Table Changes': props<{ table: Multiplication }>(), 'Nom changes': props<{ nom: string }>() },
});

export const { tableChanges, nomChanges } = testActions;

export const testFeature = createFeature({
  name: 'Test Feature',
  reducer: createReducer(
    init,
    on(tableChanges, (state, { table }) => ({
      ...state,
      tables: state.tables.map(t => (t.id === table.id ? { ...t, answer: table.answer } : t)),
    })),
    on(nomChanges, (state, { nom }) => ({ ...state, nom }))
  ),
});

export const { selectTables, selectNom } = testFeature;
