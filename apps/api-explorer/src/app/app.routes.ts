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
    path: 'weather',
    loadComponent: () =>
      import('./pages/weather/weather-page').then((m) => m.WeatherPageComponent),
  },
  {
    path: 'youtube',
    loadComponent: () =>
      import('./pages/youtube/youtube-page').then((m) => m.YoutubePageComponent),
  },
];
