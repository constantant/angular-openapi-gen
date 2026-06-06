import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamMembershipsGetResponse =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}']['get']['responses']['200']['content']['application/json'];

export const ENTERPRISE_TEAM_MEMBERSHIPS_GET = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    username: string,
  ) => ReturnType<typeof httpResource<EnterpriseTeamMembershipsGetResponse>>
>('ENTERPRISE_TEAM_MEMBERSHIPS_GET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (enterprise: string, enterpriseTeam: string, username: string) =>
      httpResource<EnterpriseTeamMembershipsGetResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/memberships/${username}`,
      }));
  },
});
