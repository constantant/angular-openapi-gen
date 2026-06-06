import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamOrganizationsBulkAddBody = NonNullable<
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/organizations/add']['post']['requestBody']
>['content']['application/json'];

export type EnterpriseTeamOrganizationsBulkAddResponse =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/organizations/add']['post']['responses']['200']['content']['application/json'];

export const ENTERPRISE_TEAM_ORGANIZATIONS_BULK_ADD = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    body:
      | EnterpriseTeamOrganizationsBulkAddBody
      | Signal<EnterpriseTeamOrganizationsBulkAddBody>,
  ) => ReturnType<
    typeof httpResource<EnterpriseTeamOrganizationsBulkAddResponse>
  >
>('ENTERPRISE_TEAM_ORGANIZATIONS_BULK_ADD', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      enterprise: string,
      enterpriseTeam: string,
      body:
        | EnterpriseTeamOrganizationsBulkAddBody
        | Signal<EnterpriseTeamOrganizationsBulkAddBody>,
    ) =>
      httpResource<EnterpriseTeamOrganizationsBulkAddResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/organizations/add`,
        method: 'POST',
        body,
      }));
  },
});
