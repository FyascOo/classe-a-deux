import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { updateTime } from './test.store';

export const syncTimeLocalStorageEffect = createEffect(
  () => {
    return inject(Actions).pipe(
      ofType(updateTime),
      tap(({ time }) => localStorage.setItem('time', `${time}`))
    );
  },
  { functional: true, dispatch: false }
);
