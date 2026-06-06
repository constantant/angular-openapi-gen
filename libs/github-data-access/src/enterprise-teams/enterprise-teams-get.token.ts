import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type EnterpriseTeamsGetResponse =
  paths['/enterprises/{enterprise}/teams/{team_slug}']['get']['responses']['200']['content']['application/json'];

export const ENTERPRISE_TEAMS_GET = new InjectionToken<
  (
    enterprise: string,
    teamSlug: string,
  ) => ReturnType<typeof httpResource<EnterpriseTeamsGetResponse>>
>('ENTERPRISE_TEAMS_GET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (enterprise: string, teamSlug: string) =>
      httpResource<EnterpriseTeamsGetResponse>(() => ({
        url: `${base}/enterprises/${enterprise}/teams/${teamSlug}`,
      }));
  },
});
