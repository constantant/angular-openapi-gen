import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsGetByNameResponse =
  paths['/orgs/{org}/teams/{team_slug}']['get']['responses']['200']['content']['application/json'];

export const TEAMS_GET_BY_NAME = new InjectionToken<
  (
    org: string,
    teamSlug: string,
  ) => ReturnType<typeof httpResource<TeamsGetByNameResponse>>
>('TEAMS_GET_BY_NAME');

export function provideTeamsGetByName(): FactoryProvider {
  return {
    provide: TEAMS_GET_BY_NAME,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (org: string, teamSlug: string) =>
        httpResource<TeamsGetByNameResponse>(() => ({
          url: `${base}/orgs/${org}/teams/${teamSlug}`,
        }));
    },
  };
}
