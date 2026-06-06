import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { GITHUB_BASE_URL } from '@angular-openapi-gen/github-data-access';
import { PETSTORE_BASE_URL } from '@angular-openapi-gen/petstore-data-access';
import { TRAVEL_BASE_URL } from '@angular-openapi-gen/travel-data-access';
import { STRIPE_BASE_URL } from '@angular-openapi-gen/stripe-data-access';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    { provide: GITHUB_BASE_URL, useValue: 'https://api.github.com' },
    { provide: PETSTORE_BASE_URL, useValue: 'https://petstore3.swagger.io/api/v3' },
    { provide: TRAVEL_BASE_URL, useValue: 'https://try.microcks.io/rest/Train+Travel+API/1.0.0' },
    { provide: STRIPE_BASE_URL, useValue: 'https://api.stripe.com' },
  ],
};
