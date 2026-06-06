import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamsUpdateBody = NonNullable<
  paths['/enterprises/{enterprise}/teams/{team_slug}']['patch']['requestBody']
>['content']['application/json'];

export type EnterpriseTeamsUpdateResponse =
  paths['/enterprises/{enterprise}/teams/{team_slug}']['patch']['responses']['200']['content']['application/json'];

export const ENTERPRISE_TEAMS_UPDATE = new InjectionToken<
  (
    enterprise: string,
    teamSlug: string,
    body: EnterpriseTeamsUpdateBody | Signal<EnterpriseTeamsUpdateBody>,
  ) => ReturnType<typeof httpResource<EnterpriseTeamsUpdateResponse>>
>('ENTERPRISE_TEAMS_UPDATE');

export function provideEnterpriseTeamsUpdate(): FactoryProvider {
  return {
    provide: ENTERPRISE_TEAMS_UPDATE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        enterprise: string,
        teamSlug: string,
        body: EnterpriseTeamsUpdateBody | Signal<EnterpriseTeamsUpdateBody>,
      ) =>
        httpResource<EnterpriseTeamsUpdateResponse>(() => ({
          url: `${base}/enterprises/${enterprise}/teams/${teamSlug}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
