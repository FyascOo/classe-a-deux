import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { tableMultiplicationReducer } from '@classe-a-deux/test';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(),
    provideStore(),
    provideState({
      name: 'tablesMultiplicationState',
      reducer: tableMultiplicationReducer,
    }),
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
  ],
};
