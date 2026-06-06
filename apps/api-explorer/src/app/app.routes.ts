import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
  },
  {
    path: 'repos',
    loadComponent: () =>
      import('./pages/repos/repos-page').then((m) => m.ReposPageComponent),
  },
  {
    path: 'pets',
    loadComponent: () =>
      import('./pages/pets/pets-page').then((m) => m.PetsPageComponent),
  },
  {
    path: 'travel',
    loadComponent: () =>
      import('./pages/travel/travel-page').then((m) => m.TravelPageComponent),
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./pages/payments/payments-page').then(
        (m) => m.PaymentsPageComponent
      ),
  },
];
