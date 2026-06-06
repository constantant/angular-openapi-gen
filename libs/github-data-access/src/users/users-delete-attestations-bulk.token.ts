import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersDeleteAttestationsBulkBody = NonNullable<
  paths['/users/{username}/attestations/delete-request']['post']['requestBody']
>['content']['application/json'];

export const USERS_DELETE_ATTESTATIONS_BULK = new InjectionToken<
  (
    username: string,
    body:
      | UsersDeleteAttestationsBulkBody
      | Signal<UsersDeleteAttestationsBulkBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('USERS_DELETE_ATTESTATIONS_BULK');

export function provideUsersDeleteAttestationsBulk(): FactoryProvider {
  return {
    provide: USERS_DELETE_ATTESTATIONS_BULK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        body:
          | UsersDeleteAttestationsBulkBody
          | Signal<UsersDeleteAttestationsBulkBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/users/${username}/attestations/delete-request`,
          method: 'POST',
          body,
        }));
    },
  };
}
