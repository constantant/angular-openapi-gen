import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type MigrationsStartForOrgBody = NonNullable<
  paths['/orgs/{org}/migrations']['post']['requestBody']
>['content']['application/json'];

export type MigrationsStartForOrgResponse =
  paths['/orgs/{org}/migrations']['post']['responses']['201']['content']['application/json'];

export const MIGRATIONS_START_FOR_ORG = new InjectionToken<
  (
    org: string,
    body: MigrationsStartForOrgBody | Signal<MigrationsStartForOrgBody>,
  ) => ReturnType<typeof httpResource<MigrationsStartForOrgResponse>>
>('MIGRATIONS_START_FOR_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      body: MigrationsStartForOrgBody | Signal<MigrationsStartForOrgBody>,
    ) =>
      httpResource<MigrationsStartForOrgResponse>(() => ({
        url: `${base}/orgs/${org}/migrations`,
        method: 'POST',
        body,
      }));
  },
});
