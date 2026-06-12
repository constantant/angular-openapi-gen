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
import { provideMockResourceBus } from '@constantant/openapi-resource-mocks';
import {
  provideUsersGetByUsernameMock,
  provideReposListForUserMock,
} from '@angular-openapi-gen/github-data-access/mock';
import { PETSTORE_AUTH } from '@angular-openapi-gen/petstore-data-access';
import {
  provideFindPetsByStatusMock,
  provideAddPetMock,
  provideDeletePetMock,
  provideUploadFileMock,
  provideGetInventoryMock,
  providePlaceOrderMock,
  provideGetOrderByIdMock,
  provideDeleteOrderMock,
  provideLoginUserMock,
  provideLogoutUserMock,
  provideGetUserByNameMock,
  provideCreateUserMock,
  provideDeleteUserMock,
} from '@angular-openapi-gen/petstore-data-access/mock';
import { provideGetV1ForecastMock } from '@angular-openapi-gen/weather-data-access/mock';
import { provideYoutubeSearchListMock } from '@angular-openapi-gen/youtube-data-access/mock';

export const YOUTUBE_API_KEY = new InjectionToken<WritableSignal<string | null>>(
  'YOUTUBE_API_KEY',
  { providedIn: 'root', factory: () => signal('mock-api-key') },
);

export const PETSTORE_SESSION = new InjectionToken<WritableSignal<string | null>>(
  'PETSTORE_SESSION',
  { providedIn: 'root', factory: () => signal(null) },
);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideMockResourceBus(),
    { provide: PETSTORE_AUTH, useExisting: PETSTORE_SESSION },

    provideUsersGetByUsernameMock({
      value: { login: 'angular', name: 'Angular', public_repos: 300 },
      delay: 500,
    }),

    provideReposListForUserMock({
      value: [
        { id: 1, name: 'angular', description: 'Deliver web apps with confidence', stargazers_count: 93400 },
        { id: 2, name: 'angular-cli', description: 'CLI tool for Angular', stargazers_count: 26300 },
        { id: 3, name: 'components', description: 'Material Design components for Angular', stargazers_count: 24100 },
      ],
      delay: 500,
    }),

    // Petstore — pet
    provideFindPetsByStatusMock({
      value: [
        { id: 1, name: 'Rex', status: 'available', photoUrls: [], category: { id: 1, name: 'Dogs' }, tags: [{ id: 1, name: 'friendly' }] },
        { id: 2, name: 'Luna', status: 'available', photoUrls: [], category: { id: 1, name: 'Dogs' } },
        { id: 3, name: 'Buddy', status: 'available', photoUrls: [], category: { id: 2, name: 'Cats' } },
      ],
      delay: 500,
    }),
    provideAddPetMock({
      value: { id: 99, name: 'New Pet', status: 'available', photoUrls: [] },
      delay: 300,
    }),
    provideDeletePetMock({ value: undefined, delay: 200 }),
    provideUploadFileMock({ value: { code: 200, type: 'unknown', message: 'File uploaded successfully' }, delay: 300 }),

    // Petstore — store
    provideGetInventoryMock({
      value: { available: 142, pending: 8, sold: 23 },
      delay: 400,
    }),
    providePlaceOrderMock({
      value: { id: 100, petId: 5, quantity: 1, status: 'placed', complete: false },
      delay: 300,
    }),
    provideGetOrderByIdMock({
      value: { id: 1, petId: 5, quantity: 2, status: 'placed', shipDate: '2026-06-20T00:00:00.000Z', complete: false },
      delay: 400,
    }),
    provideDeleteOrderMock({ value: undefined, delay: 200 }),

    // Petstore — user
    provideLoginUserMock({ value: 'logged-in-user session:mocktoken123', delay: 300 }),
    provideLogoutUserMock({ value: undefined, delay: 200 }),
    provideGetUserByNameMock({
      value: { id: 1, username: 'john', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '555-1234', userStatus: 1 },
      delay: 400,
    }),
    provideCreateUserMock({ value: {}, delay: 300 }),
    provideDeleteUserMock({ value: undefined, delay: 200 }),

    provideGetV1ForecastMock({
      value: {
        latitude: 52.374,
        longitude: 4.89,
        current: { temperature_2m: 18.5, wind_speed_10m: 12 },
        daily: {
          time: ['2026-06-08', '2026-06-09', '2026-06-10'],
          temperature_2m_max: [22, 24, 19],
          temperature_2m_min: [13, 15, 11],
          precipitation_sum: [0, 0.5, 8],
          weather_code: [0, 3, 61],
        },
      },
      delay: 500,
    }),

    provideYoutubeSearchListMock({
      value: {
        kind: 'youtube#searchListResponse',
        pageInfo: { totalResults: 3, resultsPerPage: 12 },
        items: [
          {
            id: { videoId: 'dq1ilXOmChs' },
            snippet: {
              title: 'Angular in 100 Seconds',
              channelTitle: 'Fireship',
              thumbnails: { medium: { url: 'https://i.ytimg.com/vi/dq1ilXOmChs/mqdefault.jpg' } },
            },
          },
          {
            id: { videoId: 'xAT0lHYhHMY' },
            snippet: {
              title: 'Angular Signals are here!',
              channelTitle: 'Angular',
              thumbnails: { medium: { url: 'https://i.ytimg.com/vi/xAT0lHYhHMY/mqdefault.jpg' } },
            },
          },
          {
            id: { videoId: 'r5DEBMuStPw' },
            snippet: {
              title: 'Angular 22 New Features',
              channelTitle: 'Angular University',
              thumbnails: { medium: { url: 'https://i.ytimg.com/vi/r5DEBMuStPw/mqdefault.jpg' } },
            },
          },
        ],
      },
      delay: 500,
    }),
  ],
};
