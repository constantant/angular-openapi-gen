import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsGetLegacyResponse =
  paths['/teams/{team_id}']['get']['responses']['200']['content']['application/json'];

export const TEAMS_GET_LEGACY = new InjectionToken<
  (teamId: string) => ReturnType<typeof httpResource<TeamsGetLegacyResponse>>
>('TEAMS_GET_LEGACY');

export function provideTeamsGetLegacy(): FactoryProvider {
  return {
    provide: TEAMS_GET_LEGACY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (teamId: string) =>
        httpResource<TeamsGetLegacyResponse>(() => ({
          url: `${base}/teams/${teamId}`,
        }));
    },
  };
}
