import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsListMembersInOrgParams =
  paths['/orgs/{org}/teams/{team_slug}/members']['get']['parameters']['query'];

export type TeamsListMembersInOrgResponse =
  paths['/orgs/{org}/teams/{team_slug}/members']['get']['responses']['200']['content']['application/json'];

export const TEAMS_LIST_MEMBERS_IN_ORG = new InjectionToken<
  (
    org: string,
    teamSlug: string,
    params?:
      | TeamsListMembersInOrgParams
      | (() => TeamsListMembersInOrgParams | undefined),
  ) => ReturnType<typeof httpResource<TeamsListMembersInOrgResponse>>
>('TEAMS_LIST_MEMBERS_IN_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      teamSlug: string,
      params?:
        | TeamsListMembersInOrgParams
        | (() => TeamsListMembersInOrgParams | undefined),
    ) =>
      httpResource<TeamsListMembersInOrgResponse>(() => ({
        url: `${base}/orgs/${org}/teams/${teamSlug}/members`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
