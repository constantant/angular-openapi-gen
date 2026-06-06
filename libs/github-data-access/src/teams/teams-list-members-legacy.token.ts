import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsListMembersLegacyParams =
  paths['/teams/{team_id}/members']['get']['parameters']['query'];

export type TeamsListMembersLegacyResponse =
  paths['/teams/{team_id}/members']['get']['responses']['200']['content']['application/json'];

export const TEAMS_LIST_MEMBERS_LEGACY = new InjectionToken<
  (
    teamId: string,
    params?:
      | TeamsListMembersLegacyParams
      | (() => TeamsListMembersLegacyParams | undefined),
  ) => ReturnType<typeof httpResource<TeamsListMembersLegacyResponse>>
>('TEAMS_LIST_MEMBERS_LEGACY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      teamId: string,
      params?:
        | TeamsListMembersLegacyParams
        | (() => TeamsListMembersLegacyParams | undefined),
    ) =>
      httpResource<TeamsListMembersLegacyResponse>(() => ({
        url: `${base}/teams/${teamId}/members`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
