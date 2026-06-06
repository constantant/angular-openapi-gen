import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsGetMembershipForUserInOrgResponse =
  paths['/orgs/{org}/teams/{team_slug}/memberships/{username}']['get']['responses']['200']['content']['application/json'];

export const TEAMS_GET_MEMBERSHIP_FOR_USER_IN_ORG = new InjectionToken<
  (
    org: string,
    teamSlug: string,
    username: string,
  ) => ReturnType<typeof httpResource<TeamsGetMembershipForUserInOrgResponse>>
>('TEAMS_GET_MEMBERSHIP_FOR_USER_IN_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, teamSlug: string, username: string) =>
      httpResource<TeamsGetMembershipForUserInOrgResponse>(() => ({
        url: `${base}/orgs/${org}/teams/${teamSlug}/memberships/${username}`,
      }));
  },
});
