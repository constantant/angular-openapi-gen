import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsListReposInOrgParams =
  paths['/orgs/{org}/teams/{team_slug}/repos']['get']['parameters']['query'];

export type TeamsListReposInOrgResponse =
  paths['/orgs/{org}/teams/{team_slug}/repos']['get']['responses']['200']['content']['application/json'];

export const TEAMS_LIST_REPOS_IN_ORG = new InjectionToken<
  (
    org: string,
    teamSlug: string,
    params?:
      | TeamsListReposInOrgParams
      | (() => TeamsListReposInOrgParams | undefined),
  ) => ReturnType<typeof httpResource<TeamsListReposInOrgResponse>>
>('TEAMS_LIST_REPOS_IN_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      teamSlug: string,
      params?:
        | TeamsListReposInOrgParams
        | (() => TeamsListReposInOrgParams | undefined),
    ) =>
      httpResource<TeamsListReposInOrgResponse>(() => ({
        url: `${base}/orgs/${org}/teams/${teamSlug}/repos`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
