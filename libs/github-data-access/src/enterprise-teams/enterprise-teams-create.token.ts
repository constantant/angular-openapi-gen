import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamsCreateBody = NonNullable<
  paths['/enterprises/{enterprise}/teams']['post']['requestBody']
>['content']['application/json'];

export type EnterpriseTeamsCreateResponse =
  paths['/enterprises/{enterprise}/teams']['post']['responses']['201']['content']['application/json'];

export const ENTERPRISE_TEAMS_CREATE = new InjectionToken<
  (
    enterprise: string,
    body: EnterpriseTeamsCreateBody | Signal<EnterpriseTeamsCreateBody>,
  ) => ReturnType<typeof httpResource<EnterpriseTeamsCreateResponse>>
>('ENTERPRISE_TEAMS_CREATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      enterprise: string,
      body: EnterpriseTeamsCreateBody | Signal<EnterpriseTeamsCreateBody>,
    ) =>
      httpResource<EnterpriseTeamsCreateResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/teams`,
        method: 'POST',
        body,
      }));
  },
});
