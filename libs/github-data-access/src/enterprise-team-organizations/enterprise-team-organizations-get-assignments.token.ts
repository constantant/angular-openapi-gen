import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamOrganizationsGetAssignmentsParams =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/organizations']['get']['parameters']['query'];

export type EnterpriseTeamOrganizationsGetAssignmentsResponse =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/organizations']['get']['responses']['200']['content']['application/json'];

export const ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENTS = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    params?:
      | EnterpriseTeamOrganizationsGetAssignmentsParams
      | (() => EnterpriseTeamOrganizationsGetAssignmentsParams | undefined),
  ) => ReturnType<
    typeof httpResource<EnterpriseTeamOrganizationsGetAssignmentsResponse>
  >
>('ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      enterprise: string,
      enterpriseTeam: string,
      params?:
        | EnterpriseTeamOrganizationsGetAssignmentsParams
        | (() => EnterpriseTeamOrganizationsGetAssignmentsParams | undefined),
    ) =>
      httpResource<EnterpriseTeamOrganizationsGetAssignmentsResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/organizations`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
