import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsUpdateInOrgBody = NonNullable<
  paths['/orgs/{org}/teams/{team_slug}']['patch']['requestBody']
>['content']['application/json'];

export type TeamsUpdateInOrgResponse =
  paths['/orgs/{org}/teams/{team_slug}']['patch']['responses']['200']['content']['application/json'];

export const TEAMS_UPDATE_IN_ORG = new InjectionToken<
  (
    org: string,
    teamSlug: string,
    body: TeamsUpdateInOrgBody | Signal<TeamsUpdateInOrgBody>,
  ) => ReturnType<typeof httpResource<TeamsUpdateInOrgResponse>>
>('TEAMS_UPDATE_IN_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      teamSlug: string,
      body: TeamsUpdateInOrgBody | Signal<TeamsUpdateInOrgBody>,
    ) =>
      httpResource<TeamsUpdateInOrgResponse>(() => ({
        url: `${base}/orgs/${org}/teams/${teamSlug}`,
        method: 'PATCH',
        body,
      }));
  },
});
