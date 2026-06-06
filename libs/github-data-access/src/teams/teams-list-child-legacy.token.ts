import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsListChildLegacyParams =
  paths['/teams/{team_id}/teams']['get']['parameters']['query'];

export type TeamsListChildLegacyResponse =
  paths['/teams/{team_id}/teams']['get']['responses']['200']['content']['application/json'];

export const TEAMS_LIST_CHILD_LEGACY = new InjectionToken<
  (
    teamId: string,
    params?:
      | TeamsListChildLegacyParams
      | (() => TeamsListChildLegacyParams | undefined),
  ) => ReturnType<typeof httpResource<TeamsListChildLegacyResponse>>
>('TEAMS_LIST_CHILD_LEGACY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      teamId: string,
      params?:
        | TeamsListChildLegacyParams
        | (() => TeamsListChildLegacyParams | undefined),
    ) =>
      httpResource<TeamsListChildLegacyResponse>(() => ({
        url: `${base}/teams/${teamId}/teams`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
