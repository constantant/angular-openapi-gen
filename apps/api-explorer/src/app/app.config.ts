import {
  ApplicationConfig,
  InjectionToken,
  WritableSignal,
  inject,
  provideBrowserGlobalErrorListeners,
  signal,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
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
import {
  YOUTUBE_BASE_URL,
  OAUTH2,
  OAUTH2C,
  provideYoutubeSearchList,
} from '@angular-openapi-gen/youtube-data-access';

export const YOUTUBE_API_KEY = new InjectionToken<WritableSignal<string | null>>(
  'YOUTUBE_API_KEY',
  { providedIn: 'root', factory: () => signal(null) }
);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    { provide: GITHUB_BASE_URL, useValue: 'https://api.github.com' },
    { provide: PETSTORE_BASE_URL, useValue: 'https://petstore3.swagger.io/api/v3' },
    { provide: WEATHER_BASE_URL, useValue: 'https://api.open-meteo.com' },
    { provide: YOUTUBE_BASE_URL, useValue: 'https://youtube.googleapis.com' },
    { provide: OAUTH2,  useFactory: () => inject(YOUTUBE_API_KEY) },
    { provide: OAUTH2C, useFactory: () => inject(YOUTUBE_API_KEY) },
    provideUsersGetByUsername(),
    provideReposListForUser(),
    provideFindPetsByStatus(),
    provideGetV1Forecast(),
    provideYoutubeSearchList(),
  ],
};
