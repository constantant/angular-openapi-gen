import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamMembershipsAddResponse =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/memberships/{username}']['put']['responses']['201']['content']['application/json'];

export const ENTERPRISE_TEAM_MEMBERSHIPS_ADD = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    username: string,
  ) => ReturnType<typeof httpResource<EnterpriseTeamMembershipsAddResponse>>
>('ENTERPRISE_TEAM_MEMBERSHIPS_ADD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (enterprise: string, enterpriseTeam: string, username: string) =>
      httpResource<EnterpriseTeamMembershipsAddResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/memberships/${username}`,
        method: 'PUT',
      }));
  },
});
