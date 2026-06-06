import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type UsersDeleteAttestationsBulkBody = NonNullable<
  paths['/users/{username}/attestations/delete-request']['post']['requestBody']
>['content']['application/json'];

type UsersDeleteAttestationsBulkResponse =
  paths['/users/{username}/attestations/delete-request']['post']['responses']['200']['content']['application/json'];

export const USERS_DELETE_ATTESTATIONS_BULK = new InjectionToken<
  (
    username: string,
    body:
      | UsersDeleteAttestationsBulkBody
      | Signal<UsersDeleteAttestationsBulkBody>,
  ) => ReturnType<typeof httpResource<UsersDeleteAttestationsBulkResponse>>
>('USERS_DELETE_ATTESTATIONS_BULK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      username: string,
      body:
        | UsersDeleteAttestationsBulkBody
        | Signal<UsersDeleteAttestationsBulkBody>,
    ) =>
      httpResource<UsersDeleteAttestationsBulkResponse>(() => ({
        url: `${base}/users/${username}/attestations/delete-request`,
        method: 'POST',
        body,
      }));
  },
});
