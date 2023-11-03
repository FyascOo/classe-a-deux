import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@classe-a-deux/table-multiplication').then(
        (c) => c.TableMultiplicationComponent
      ),
  },
  {
    path: 'result',
    loadComponent: () =>
      import('@classe-a-deux/result').then((c) => c.ResultComponent),
  },
];
