import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsAddOrUpdateMembershipForUserLegacyBody = NonNullable<
  paths['/teams/{team_id}/memberships/{username}']['put']['requestBody']
>['content']['application/json'];

export type TeamsAddOrUpdateMembershipForUserLegacyResponse =
  paths['/teams/{team_id}/memberships/{username}']['put']['responses']['200']['content']['application/json'];

export const TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_LEGACY =
  new InjectionToken<
    (
      teamId: string,
      username: string,
      body:
        | TeamsAddOrUpdateMembershipForUserLegacyBody
        | Signal<TeamsAddOrUpdateMembershipForUserLegacyBody>,
    ) => ReturnType<
      typeof httpResource<TeamsAddOrUpdateMembershipForUserLegacyResponse>
    >
  >('TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_LEGACY');

export function provideTeamsAddOrUpdateMembershipForUserLegacy(): FactoryProvider {
  return {
    provide: TEAMS_ADD_OR_UPDATE_MEMBERSHIP_FOR_USER_LEGACY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        teamId: string,
        username: string,
        body:
          | TeamsAddOrUpdateMembershipForUserLegacyBody
          | Signal<TeamsAddOrUpdateMembershipForUserLegacyBody>,
      ) =>
        httpResource<TeamsAddOrUpdateMembershipForUserLegacyResponse>(() => ({
          url: `${base}/teams/${teamId}/memberships/${username}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
