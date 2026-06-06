import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsListChildInOrgParams =
  paths['/orgs/{org}/teams/{team_slug}/teams']['get']['parameters']['query'];

export type TeamsListChildInOrgResponse =
  paths['/orgs/{org}/teams/{team_slug}/teams']['get']['responses']['200']['content']['application/json'];

export const TEAMS_LIST_CHILD_IN_ORG = new InjectionToken<
  (
    org: string,
    teamSlug: string,
    params?:
      | TeamsListChildInOrgParams
      | (() => TeamsListChildInOrgParams | undefined),
  ) => ReturnType<typeof httpResource<TeamsListChildInOrgResponse>>
>('TEAMS_LIST_CHILD_IN_ORG');

export function provideTeamsListChildInOrg(): FactoryProvider {
  return {
    provide: TEAMS_LIST_CHILD_IN_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        teamSlug: string,
        params?:
          | TeamsListChildInOrgParams
          | (() => TeamsListChildInOrgParams | undefined),
      ) =>
        httpResource<TeamsListChildInOrgResponse>(() => ({
          url: `${base}/orgs/${org}/teams/${teamSlug}/teams`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
