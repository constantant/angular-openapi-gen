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
import { provideMockResourceBus, provideMockResource } from '@constantant/openapi-resource-mocks';
import {
  USERS_GET_BY_USERNAME,
  REPOS_LIST_FOR_USER,
} from '@angular-openapi-gen/github-data-access';
import { FIND_PETS_BY_STATUS } from '@angular-openapi-gen/petstore-data-access';
import { GET_V1_FORECAST } from '@angular-openapi-gen/weather-data-access';
import { YOUTUBE_SEARCH_LIST } from '@angular-openapi-gen/youtube-data-access';

export const YOUTUBE_API_KEY = new InjectionToken<WritableSignal<string | null>>(
  'YOUTUBE_API_KEY',
  { providedIn: 'root', factory: () => signal('mock-api-key') },
);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    provideMockResourceBus(),

    provideMockResource(USERS_GET_BY_USERNAME, 'USERS_GET_BY_USERNAME', {
      value: { login: 'angular', name: 'Angular', public_repos: 300 },
    }),

    provideMockResource(REPOS_LIST_FOR_USER, 'REPOS_LIST_FOR_USER', {
      value: [
        { id: 1, name: 'angular', description: 'Deliver web apps with confidence', stargazers_count: 93400 },
        { id: 2, name: 'angular-cli', description: 'CLI tool for Angular', stargazers_count: 26300 },
        { id: 3, name: 'components', description: 'Material Design components for Angular', stargazers_count: 24100 },
      ],
    }),

    provideMockResource(FIND_PETS_BY_STATUS, 'FIND_PETS_BY_STATUS', {
      value: [
        { id: 1, name: 'Rex', status: 'available', photoUrls: [] },
        { id: 2, name: 'Luna', status: 'available', photoUrls: [] },
        { id: 3, name: 'Buddy', status: 'available', photoUrls: [] },
      ],
    }),

    provideMockResource(GET_V1_FORECAST, 'GET_V1_FORECAST', {
      value: {
        latitude: 52.374,
        longitude: 4.89,
        current: { temperature_2m: 18.5, wind_speed_10m: 12 },
        daily: {
          time: ['2026-06-08', '2026-06-09', '2026-06-10'],
          temperature_2m_max: [22, 24, 19],
          temperature_2m_min: [13, 15, 11],
          precipitation_sum: [0, 0.5, 8],
        },
      },
    }),

    provideMockResource(YOUTUBE_SEARCH_LIST, 'YOUTUBE_SEARCH_LIST', {
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
    }),
  ],
};
