import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENTS');

export function provideEnterpriseTeamOrganizationsGetAssignments(): FactoryProvider {
  return {
    provide: ENTERPRISE_TEAM_ORGANIZATIONS_GET_ASSIGNMENTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        enterpriseTeam: string,
        params?:
          | EnterpriseTeamOrganizationsGetAssignmentsParams
          | (() => EnterpriseTeamOrganizationsGetAssignmentsParams | undefined),
      ) =>
        httpResource<EnterpriseTeamOrganizationsGetAssignmentsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/organizations`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
