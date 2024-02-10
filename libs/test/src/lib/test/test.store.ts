import {
  createActionGroup,
  createFeature,
  createReducer,
  on,
  props,
} from '@ngrx/store';
import { Multiplication, TABLES } from './test.constante';

export interface TableMultiplicationState {
  tables: Multiplication[];
  nom: string;
  time: number;
}

export const init: TableMultiplicationState = {
  tables: [...TABLES],
  nom: '',
  time: 5,
};

const testActions = createActionGroup({
  source: 'Test Action',
  events: {
    'Table Changes': props<{ table: Multiplication }>(),
    'Nom changes': props<{ nom: string }>(),
    'Update time': props<{ time: number }>(),
  },
});

export const { tableChanges, nomChanges, updateTime } = testActions;

export const testFeature = createFeature({
  name: 'Test Feature',
  reducer: createReducer(
    init,
    on(tableChanges, (state, { table }) => ({
      ...state,
      tables: state.tables.map(t =>
        t.id === table.id ? { ...t, answer: table.answer } : t
      ),
    })),
    on(nomChanges, (state, { nom }) => ({ ...state, nom })),
    on(updateTime, (state, { time }) => ({
      ...state,
      time,
    }))
  ),
});

export const { selectTables, selectNom, selectTime } = testFeature;
