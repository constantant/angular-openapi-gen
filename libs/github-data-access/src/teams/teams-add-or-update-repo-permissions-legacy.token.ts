import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type TeamsAddOrUpdateRepoPermissionsLegacyBody = NonNullable<
  paths['/teams/{team_id}/repos/{owner}/{repo}']['put']['requestBody']
>['content']['application/json'];

export const TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_LEGACY = new InjectionToken<
  (
    teamId: string,
    owner: string,
    repo: string,
    body:
      | TeamsAddOrUpdateRepoPermissionsLegacyBody
      | Signal<TeamsAddOrUpdateRepoPermissionsLegacyBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_LEGACY');

export function provideTeamsAddOrUpdateRepoPermissionsLegacy(): FactoryProvider {
  return {
    provide: TEAMS_ADD_OR_UPDATE_REPO_PERMISSIONS_LEGACY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        teamId: string,
        owner: string,
        repo: string,
        body:
          | TeamsAddOrUpdateRepoPermissionsLegacyBody
          | Signal<TeamsAddOrUpdateRepoPermissionsLegacyBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/teams/${teamId}/repos/${owner}/${repo}`,
          method: 'PUT',
          body,
        }));
    },
  };
}
