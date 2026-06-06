import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type UsersUpdateAuthenticatedBody = NonNullable<
  paths['/user']['patch']['requestBody']
>['content']['application/json'];

export type UsersUpdateAuthenticatedResponse =
  paths['/user']['patch']['responses']['200']['content']['application/json'];

export const USERS_UPDATE_AUTHENTICATED = new InjectionToken<
  (
    body: UsersUpdateAuthenticatedBody | Signal<UsersUpdateAuthenticatedBody>,
  ) => ReturnType<typeof httpResource<UsersUpdateAuthenticatedResponse>>
>('USERS_UPDATE_AUTHENTICATED', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      body: UsersUpdateAuthenticatedBody | Signal<UsersUpdateAuthenticatedBody>,
    ) =>
      httpResource<UsersUpdateAuthenticatedResponse>(() => ({
        url: `${base}/user`,
        method: 'PATCH',
        body,
      }));
  },
});
