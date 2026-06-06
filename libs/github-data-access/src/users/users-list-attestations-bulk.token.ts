import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersListAttestationsBulkBody = NonNullable<
  paths['/users/{username}/attestations/bulk-list']['post']['requestBody']
>['content']['application/json'];

export type UsersListAttestationsBulkResponse =
  paths['/users/{username}/attestations/bulk-list']['post']['responses']['200']['content']['application/json'];

export const USERS_LIST_ATTESTATIONS_BULK = new InjectionToken<
  (
    username: string,
    body: UsersListAttestationsBulkBody | Signal<UsersListAttestationsBulkBody>,
  ) => ReturnType<typeof httpResource<UsersListAttestationsBulkResponse>>
>('USERS_LIST_ATTESTATIONS_BULK');

export function provideUsersListAttestationsBulk(): FactoryProvider {
  return {
    provide: USERS_LIST_ATTESTATIONS_BULK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        username: string,
        body:
          | UsersListAttestationsBulkBody
          | Signal<UsersListAttestationsBulkBody>,
      ) =>
        httpResource<UsersListAttestationsBulkResponse>(() => ({
          url: `${base}/users/${username}/attestations/bulk-list`,
          method: 'POST',
          body,
        }));
    },
  };
}
