import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamOrganizationsGetAssignmentResponse =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}']['get']['responses']['200']['content']['application/json'];

export const ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENT = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    org: string,
  ) => ReturnType<
    typeof httpResource<EnterpriseTeamOrganizationsGetAssignmentResponse>
  >
>('ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (enterprise: string, enterpriseTeam: string, org: string) =>
      httpResource<EnterpriseTeamOrganizationsGetAssignmentResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/organizations/${org}`,
      }));
  },
});
