import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsListReposLegacyParams =
  paths['/teams/{team_id}/repos']['get']['parameters']['query'];

export type TeamsListReposLegacyResponse =
  paths['/teams/{team_id}/repos']['get']['responses']['200']['content']['application/json'];

export const TEAMS_LIST_REPOS_LEGACY = new InjectionToken<
  (
    teamId: string,
    params?:
      | TeamsListReposLegacyParams
      | (() => TeamsListReposLegacyParams | undefined),
  ) => ReturnType<typeof httpResource<TeamsListReposLegacyResponse>>
>('TEAMS_LIST_REPOS_LEGACY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      teamId: string,
      params?:
        | TeamsListReposLegacyParams
        | (() => TeamsListReposLegacyParams | undefined),
    ) =>
      httpResource<TeamsListReposLegacyResponse>(() => ({
        url: `${base}/teams/${teamId}/repos`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
