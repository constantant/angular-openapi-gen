import { InjectionToken, inject } from '@angular/core';
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
>('TEAMS_LIST_PENDING_INVITATIONS_IN_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      teamSlug: string,
      params?:
        | TeamsListPendingInvitationsInOrgParams
        | (() => TeamsListPendingInvitationsInOrgParams | undefined),
    ) =>
      httpResource<TeamsListPendingInvitationsInOrgResponse>(() => ({
        url: `${base}/orgs/${org}/teams/${teamSlug}/invitations`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
