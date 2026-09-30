import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersDeleteAttestationsBulkBody = NonNullable<
  paths['/users/{username}/attestations/delete-request']['post']['requestBody']
>['content']['application/json'];

export type UsersDeleteAttestationsBulkError =
  paths['/users/{username}/attestations/delete-request']['post']['responses']['404']['content']['application/json'];

export const USERS_DELETE_ATTESTATIONS_BULK = new InjectionToken<
  (
    username: string,
    body: UsersDeleteAttestationsBulkBody,
  ) => Observable<unknown>
>('USERS_DELETE_ATTESTATIONS_BULK');

export function provideUsersDeleteAttestationsBulk(): FactoryProvider {
  return {
    provide: USERS_DELETE_ATTESTATIONS_BULK,
    useFactory: () => {
      const http = inject(HttpClient);
      const base = inject(GITHUB_BASE_URL);
      return (username: string, body: UsersDeleteAttestationsBulkBody) =>
        http.request<unknown>(
          'POST',
          `${base}/users/${username}/attestations/delete-request`,
          {
            body,
          },
        );
    },
  };
}
