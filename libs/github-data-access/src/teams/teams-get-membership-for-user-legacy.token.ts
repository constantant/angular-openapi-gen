import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsGetMembershipForUserLegacyResponse =
  paths['/teams/{team_id}/memberships/{username}']['get']['responses']['200']['content']['application/json'];

export const TEAMS_GET_MEMBERSHIP_FOR_USER_LEGACY = new InjectionToken<
  (
    teamId: string,
    username: string,
  ) => ReturnType<typeof httpResource<TeamsGetMembershipForUserLegacyResponse>>
>('TEAMS_GET_MEMBERSHIP_FOR_USER_LEGACY');

export function provideTeamsGetMembershipForUserLegacy(): FactoryProvider {
  return {
    provide: TEAMS_GET_MEMBERSHIP_FOR_USER_LEGACY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (teamId: string, username: string) =>
        httpResource<TeamsGetMembershipForUserLegacyResponse>(() => ({
          url: `${base}/teams/${teamId}/memberships/${username}`,
        }));
    },
  };
}
