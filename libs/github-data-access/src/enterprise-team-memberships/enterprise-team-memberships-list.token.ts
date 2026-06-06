import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamMembershipsListParams =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/memberships']['get']['parameters']['query'];

export type EnterpriseTeamMembershipsListResponse =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/memberships']['get']['responses']['200']['content']['application/json'];

export const ENTERPRISE_TEAM_MEMBERSHIPS_LIST = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    params?:
      | EnterpriseTeamMembershipsListParams
      | (() => EnterpriseTeamMembershipsListParams | undefined),
  ) => ReturnType<typeof httpResource<EnterpriseTeamMembershipsListResponse>>
>('ENTERPRISE_TEAM_MEMBERSHIPS_LIST');

export function provideEnterpriseTeamMembershipsList(): FactoryProvider {
  return {
    provide: ENTERPRISE_TEAM_MEMBERSHIPS_LIST,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        enterpriseTeam: string,
        params?:
          | EnterpriseTeamMembershipsListParams
          | (() => EnterpriseTeamMembershipsListParams | undefined),
      ) =>
        httpResource<EnterpriseTeamMembershipsListResponse>(() => ({
          url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/memberships`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
