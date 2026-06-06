import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsAddOrUpdateRepoPermissionsInOrgBody = NonNullable<
  paths['/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}']['put']['requestBody']
>['content']['application/json'];

export const TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_IN_ORG = new InjectionToken<
  (
    org: string,
    teamSlug: string,
    owner: string,
    repo: string,
    body:
      | TeamsAddOrUpdateRepoPermissionsInOrgBody
      | Signal<TeamsAddOrUpdateRepoPermissionsInOrgBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_IN_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      org: string,
      teamSlug: string,
      owner: string,
      repo: string,
      body:
        | TeamsAddOrUpdateRepoPermissionsInOrgBody
        | Signal<TeamsAddOrUpdateRepoPermissionsInOrgBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/orgs/${org}/teams/${teamSlug}/repos/${owner}/${repo}`,
        method: 'PUT',
        body,
      }));
  },
});
