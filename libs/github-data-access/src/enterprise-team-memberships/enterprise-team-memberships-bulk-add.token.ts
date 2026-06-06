import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamMembershipsBulkAddBody = NonNullable<
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/memberships/add']['post']['requestBody']
>['content']['application/json'];

export type EnterpriseTeamMembershipsBulkAddResponse =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/memberships/add']['post']['responses']['200']['content']['application/json'];

export const ENTERPRISE_TEAM_MEMBERSHIPS_BULK_ADD = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    body:
      | EnterpriseTeamMembershipsBulkAddBody
      | Signal<EnterpriseTeamMembershipsBulkAddBody>,
  ) => ReturnType<typeof httpResource<EnterpriseTeamMembershipsBulkAddResponse>>
>('ENTERPRISE_TEAM_MEMBERSHIPS_BULK_ADD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      enterprise: string,
      enterpriseTeam: string,
      body:
        | EnterpriseTeamMembershipsBulkAddBody
        | Signal<EnterpriseTeamMembershipsBulkAddBody>,
    ) =>
      httpResource<EnterpriseTeamMembershipsBulkAddResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/memberships/add`,
        method: 'POST',
        body,
      }));
  },
});
