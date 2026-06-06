import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsCheckPermissionsForRepoLegacyResponse =
  paths['/teams/{team_id}/repos/{owner}/{repo}']['get']['responses']['200']['content']['application/json'];

export const TEAMS_CHECK_PERMISSIONS_FOR_REPO_LEGACY = new InjectionToken<
  (
    teamId: string,
    owner: string,
    repo: string,
  ) => ReturnType<
    typeof httpResource<TeamsCheckPermissionsForRepoLegacyResponse>
  >
>('TEAMS_CHECK_PERMISSIONS_FOR_REPO_LEGACY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (teamId: string, owner: string, repo: string) =>
      httpResource<TeamsCheckPermissionsForRepoLegacyResponse>(() => ({
        url: `${base}/teams/${teamId}/repos/${owner}/${repo}`,
      }));
  },
});
