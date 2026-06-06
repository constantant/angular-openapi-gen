import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamMembershipsBulkRemoveBody = NonNullable<
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/memberships/remove']['post']['requestBody']
>['content']['application/json'];

export type EnterpriseTeamMembershipsBulkRemoveResponse =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/memberships/remove']['post']['responses']['200']['content']['application/json'];

export const ENTERPRISE_TEAM_MEMBERSHIPS_BULK_REMOVE = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    body:
      | EnterpriseTeamMembershipsBulkRemoveBody
      | Signal<EnterpriseTeamMembershipsBulkRemoveBody>,
  ) => ReturnType<
    typeof httpResource<EnterpriseTeamMembershipsBulkRemoveResponse>
  >
>('ENTERPRISE_TEAM_MEMBERSHIPS_BULK_REMOVE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      enterprise: string,
      enterpriseTeam: string,
      body:
        | EnterpriseTeamMembershipsBulkRemoveBody
        | Signal<EnterpriseTeamMembershipsBulkRemoveBody>,
    ) =>
      httpResource<EnterpriseTeamMembershipsBulkRemoveResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/memberships/remove`,
        method: 'POST',
        body,
      }));
  },
});
