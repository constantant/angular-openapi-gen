import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsCreateBody = NonNullable<
  paths['/orgs/{org}/teams']['post']['requestBody']
>['content']['application/json'];

export type TeamsCreateResponse =
  paths['/orgs/{org}/teams']['post']['responses']['201']['content']['application/json'];

export const TEAMS_CREATE = new InjectionToken<
  (
    org: string,
    body: TeamsCreateBody | Signal<TeamsCreateBody>,
  ) => ReturnType<typeof httpResource<TeamsCreateResponse>>
>('TEAMS_CREATE');

export function provideTeamsCreate(): FactoryProvider {
  return {
    provide: TEAMS_CREATE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, body: TeamsCreateBody | Signal<TeamsCreateBody>) =>
        httpResource<TeamsCreateResponse>(() => ({
          url: `${base}/orgs/${org}/teams`,
          method: 'POST',
          body,
        }));
    },
  };
}
