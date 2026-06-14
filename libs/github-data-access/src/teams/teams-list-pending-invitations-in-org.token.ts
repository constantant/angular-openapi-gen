import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsListPendingInvitationsInOrgParams =
  paths['/orgs/{org}/teams/{team_slug}/invitations']['get']['parameters']['query'];

export type TeamsListPendingInvitationsInOrgResponse =
  paths['/orgs/{org}/teams/{team_slug}/invitations']['get']['responses']['200']['content']['application/json'];

export const TEAMS_LIST_PENDING_INVITATIONS_IN_ORG = new InjectionToken<
  (
    org: string,
    teamSlug: string,
    params?:
      | TeamsListPendingInvitationsInOrgParams
      | (() => TeamsListPendingInvitationsInOrgParams | undefined),
  ) => ReturnType<typeof httpResource<TeamsListPendingInvitationsInOrgResponse>>
>('TEAMS_LIST_PENDING_INVITATIONS_IN_ORG');

export function provideTeamsListPendingInvitationsInOrg(): FactoryProvider {
  return {
    provide: TEAMS_LIST_PENDING_INVITATIONS_IN_ORG,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        teamSlug: string,
        params?:
          | TeamsListPendingInvitationsInOrgParams
          | (() => TeamsListPendingInvitationsInOrgParams | undefined),
      ) =>
        httpResource<TeamsListPendingInvitationsInOrgResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/orgs/${org}/teams/${teamSlug}/invitations`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
