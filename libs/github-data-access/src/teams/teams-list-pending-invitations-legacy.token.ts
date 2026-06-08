import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsListPendingInvitationsLegacyParams =
  paths['/teams/{team_id}/invitations']['get']['parameters']['query'];

export type TeamsListPendingInvitationsLegacyResponse =
  paths['/teams/{team_id}/invitations']['get']['responses']['200']['content']['application/json'];

export const TEAMS_LIST_PENDING_INVITATIONS_LEGACY = new InjectionToken<
  (
    teamId: string,
    params?:
      | TeamsListPendingInvitationsLegacyParams
      | (() => TeamsListPendingInvitationsLegacyParams | undefined),
  ) => ReturnType<
    typeof httpResource<TeamsListPendingInvitationsLegacyResponse>
  >
>('TEAMS_LIST_PENDING_INVITATIONS_LEGACY');

export function provideTeamsListPendingInvitationsLegacy(): FactoryProvider {
  return {
    provide: TEAMS_LIST_PENDING_INVITATIONS_LEGACY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        teamId: string,
        params?:
          | TeamsListPendingInvitationsLegacyParams
          | (() => TeamsListPendingInvitationsLegacyParams | undefined),
      ) =>
        httpResource<TeamsListPendingInvitationsLegacyResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/teams/${teamId}/invitations`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
