import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { tableMultiplicationReducer } from '@classe-a-deux/table-multiplication';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideStore(),
    provideState({
      name: 'table-multiplication',
      reducer: tableMultiplicationReducer,
    }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
