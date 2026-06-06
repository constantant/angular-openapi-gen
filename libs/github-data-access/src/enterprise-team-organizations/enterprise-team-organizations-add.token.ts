import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamOrganizationsAddResponse =
  paths['/enterprises/{enterprise}/teams/{enterprise-team}/organizations/{org}']['put']['responses']['201']['content']['application/json'];

export const ENTERPRISE_TEAM_ORGANIZATIONS_ADD = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    org: string,
  ) => ReturnType<typeof httpResource<EnterpriseTeamOrganizationsAddResponse>>
>('ENTERPRISE_TEAM_ORGANIZATIONS_ADD');

export function provideEnterpriseTeamOrganizationsAdd(): FactoryProvider {
  return {
    provide: ENTERPRISE_TEAM_ORGANIZATIONS_ADD,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (enterprise: string, enterpriseTeam: string, org: string) =>
        httpResource<EnterpriseTeamOrganizationsAddResponse>(() => ({
          url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/organizations/${org}`,
          method: 'PUT',
        }));
    },
  };
}
