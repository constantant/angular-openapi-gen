import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsCheckPermissionsForRepoInOrgResponse =
  paths['/orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}']['get']['responses']['200']['content']['application/json'];

export const TEAMS_CHECK_PERMISSIONS_FOR_REPO_IN_ORG = new InjectionToken<
  (
    org: string,
    teamSlug: string,
    owner: string,
    repo: string,
  ) => ReturnType<
    typeof httpResource<TeamsCheckPermissionsForRepoInOrgResponse>
  >
>('TEAMS_CHECK_PERMISSIONS_FOR_REPO_IN_ORG', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (org: string, teamSlug: string, owner: string, repo: string) =>
      httpResource<TeamsCheckPermissionsForRepoInOrgResponse>(() => ({
        url: `${base}/orgs/${org}/teams/${teamSlug}/repos/${owner}/${repo}`,
      }));
  },
});
