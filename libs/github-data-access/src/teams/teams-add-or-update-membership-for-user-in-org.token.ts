import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsAddOrUpdateMembershipForUserInOrgBody = NonNullable<
  paths['/orgs/{org}/teams/{team_slug}/memberships/{username}']['put']['requestBody']
>['content']['application/json'];

export type TeamsAddOrUpdateMembershipForUserInOrgResponse =
  paths['/orgs/{org}/teams/{team_slug}/memberships/{username}']['put']['responses']['200']['content']['application/json'];

export const TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_IN_ORG =
  new InjectionToken<
    (
      org: string,
      teamSlug: string,
      username: string,
      body:
        | TeamsAddOrUpdateMembershipForUserInOrgBody
        | Signal<TeamsAddOrUpdateMembershipForUserInOrgBody>,
    ) => ReturnType<
      typeof httpResource<TeamsAddOrUpdateMembershipForUserInOrgResponse>
    >
  >('TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_IN_ORG', {
    providedIn: 'root',
    factory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        org: string,
        teamSlug: string,
        username: string,
        body:
          | TeamsAddOrUpdateMembershipForUserInOrgBody
          | Signal<TeamsAddOrUpdateMembershipForUserInOrgBody>,
      ) =>
        httpResource<TeamsAddOrUpdateMembershipForUserInOrgResponse>(() => ({
          url: `${base}/orgs/${org}/teams/${teamSlug}/memberships/${username}`,
          method: 'PUT',
          body,
        }));
    },
  });
