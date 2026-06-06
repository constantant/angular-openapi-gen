import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsStartForAuthenticatedUserBody = NonNullable<
  paths['/user/migrations']['post']['requestBody']
>['content']['application/json'];

export type MigrationsStartForAuthenticatedUserResponse =
  paths['/user/migrations']['post']['responses']['201']['content']['application/json'];

export const MIGRATIONS_START_FOR_AUTHENTICATED_USER = new InjectionToken<
  (
    body:
      | MigrationsStartForAuthenticatedUserBody
      | Signal<MigrationsStartForAuthenticatedUserBody>,
  ) => ReturnType<
    typeof httpResource<MigrationsStartForAuthenticatedUserResponse>
  >
>('MIGRATIONS_START_FOR_AUTHENTICATED_USER', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      body:
        | MigrationsStartForAuthenticatedUserBody
        | Signal<MigrationsStartForAuthenticatedUserBody>,
    ) =>
      httpResource<MigrationsStartForAuthenticatedUserResponse>(() => ({
        url: `${base}/user/migrations`,
        method: 'POST',
        body,
      }));
  },
});
