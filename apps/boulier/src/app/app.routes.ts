import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@classe-a-deux/boulier-ux').then((c) => c.BoulierUXComponent),
  },
];
