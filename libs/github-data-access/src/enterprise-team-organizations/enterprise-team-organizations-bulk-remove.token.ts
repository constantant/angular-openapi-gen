import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamOrganizationsBulkRemoveBody = NonNullable<
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/organizations/remove']['post']['requestBody']
>['content']['application/json'];

export const ENTERPRISE_TEAM_ORGANIZATIONS_BULK_REMOVE = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    body:
      | EnterpriseTeamOrganizationsBulkRemoveBody
      | Signal<EnterpriseTeamOrganizationsBulkRemoveBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ENTERPRISE_TEAM_ORGANIZATIONS_BULK_REMOVE');

export function provideEnterpriseTeamOrganizationsBulkRemove(): FactoryProvider {
  return {
    provide: ENTERPRISE_TEAM_ORGANIZATIONS_BULK_REMOVE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        enterpriseTeam: string,
        body:
          | EnterpriseTeamOrganizationsBulkRemoveBody
          | Signal<EnterpriseTeamOrganizationsBulkRemoveBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/organizations/remove`,
          method: 'POST',
          body,
        }));
    },
  };
}
