import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsUpdateLegacyBody = NonNullable<
  paths['/teams/{team_id}']['patch']['requestBody']
>['content']['application/json'];

export type TeamsUpdateLegacyResponse =
  paths['/teams/{team_id}']['patch']['responses']['200']['content']['application/json'];

export const TEAMS_UPDATE_LEGACY = new InjectionToken<
  (
    teamId: string,
    body: TeamsUpdateLegacyBody | Signal<TeamsUpdateLegacyBody>,
  ) => ReturnType<typeof httpResource<TeamsUpdateLegacyResponse>>
>('TEAMS_UPDATE_LEGACY');

export function provideTeamsUpdateLegacy(): FactoryProvider {
  return {
    provide: TEAMS_UPDATE_LEGACY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        teamId: string,
        body: TeamsUpdateLegacyBody | Signal<TeamsUpdateLegacyBody>,
      ) =>
        httpResource<TeamsUpdateLegacyResponse>(() => ({
          url: `${base}/teams/${teamId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
