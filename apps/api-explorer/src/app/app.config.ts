import {
  ApplicationConfig,
  InjectionToken,
  WritableSignal,
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
  PETSTORE_AUTH,
  PETSTORE_BASE_URL,
  provideFindPetsByStatus,
  provideAddPet,
  provideDeletePet,
  provideUploadFile,
  provideGetInventory,
  providePlaceOrder,
  provideGetOrderById,
  provideDeleteOrder,
  provideLoginUser,
  provideLogoutUser,
  provideGetUserByName,
  provideCreateUser,
  provideDeleteUser,
} from '@angular-openapi-gen/petstore-data-access';
import {
  WEATHER_BASE_URL,
  provideGetV1Forecast,
} from '@angular-openapi-gen/weather-data-access';
import {
  YOUTUBE_BASE_URL,
  provideYoutubeSearchList,
} from '@angular-openapi-gen/youtube-data-access';

export const YOUTUBE_API_KEY = new InjectionToken<WritableSignal<string | null>>(
  'YOUTUBE_API_KEY',
  { providedIn: 'root', factory: () => signal(null) }
);

/** Writable handle for the Petstore session token. Provides PETSTORE_AUTH. */
export const PETSTORE_SESSION = new InjectionToken<WritableSignal<string | null>>(
  'PETSTORE_SESSION',
  { providedIn: 'root', factory: () => signal(null) }
);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    { provide: GITHUB_BASE_URL, useValue: 'https://api.github.com' },
    { provide: PETSTORE_BASE_URL, useValue: 'https://petstore.swagger.io/v2' },
    { provide: WEATHER_BASE_URL, useValue: 'https://api.open-meteo.com' },
    { provide: YOUTUBE_BASE_URL, useValue: 'https://youtube.googleapis.com' },
    // PETSTORE_AUTH is provided by PETSTORE_SESSION so all pet/store/user
    // tokens automatically forward the login session as a Bearer header.
    { provide: PETSTORE_AUTH, useExisting: PETSTORE_SESSION },
    provideUsersGetByUsername(),
    provideReposListForUser(),
    // Petstore — pet
    provideFindPetsByStatus(),
    provideAddPet(),
    provideDeletePet(),
    provideUploadFile(),
    // Petstore — store
    provideGetInventory(),
    providePlaceOrder(),
    provideGetOrderById(),
    provideDeleteOrder(),
    // Petstore — user
    provideLoginUser(),
    provideLogoutUser(),
    provideGetUserByName(),
    provideCreateUser(),
    provideDeleteUser(),
    provideGetV1Forecast(),
    provideYoutubeSearchList(),
  ],
};
