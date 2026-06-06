import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appRoutes } from './app.routes';
import {
  GITHUB_BASE_URL,
  provideUsersGetByUsername,
  provideReposListForUser,
} from '@angular-openapi-gen/github-data-access';
import {
  PETSTORE_BASE_URL,
  provideFindPetsByStatus,
} from '@angular-openapi-gen/petstore-data-access';
import {
  WEATHER_BASE_URL,
  provideGetV1Forecast,
} from '@angular-openapi-gen/weather-data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    { provide: GITHUB_BASE_URL, useValue: 'https://api.github.com' },
    { provide: PETSTORE_BASE_URL, useValue: 'https://petstore3.swagger.io/api/v3' },
    { provide: WEATHER_BASE_URL, useValue: 'https://api.open-meteo.com' },
    provideUsersGetByUsername(),
    provideReposListForUser(),
    provideFindPetsByStatus(),
    provideGetV1Forecast(),
  ],
};
