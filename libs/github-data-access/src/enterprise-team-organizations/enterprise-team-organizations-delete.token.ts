import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ENTERPRISE_TEAM_ORGANIZATIONS_DELETE = new InjectionToken<
  (
    enterprise: string,
    enterpriseTeam: string,
    org: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ENTERPRISE_TEAM_ORGANIZATIONS_DELETE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (enterprise: string, enterpriseTeam: string, org: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${enterpriseTeam}/organizations/${org}`,
        method: 'DELETE',
      }));
  },
});
