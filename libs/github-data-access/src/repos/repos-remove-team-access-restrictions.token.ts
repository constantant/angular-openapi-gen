import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRemoveTeamAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams']['delete']['requestBody']
>['content']['application/json'];

export type ReposRemoveTeamAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams']['delete']['responses']['200']['content']['application/json'];

export const REPOS_REMOVE_TEAM_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposRemoveTeamAccessRestrictionsBody
      | Signal<ReposRemoveTeamAccessRestrictionsBody>,
  ) => ReturnType<
    typeof httpResource<ReposRemoveTeamAccessRestrictionsResponse>
  >
>('REPOS_REMOVE_TEAM_ACCESS_RESTRICTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      body:
        | ReposRemoveTeamAccessRestrictionsBody
        | Signal<ReposRemoveTeamAccessRestrictionsBody>,
    ) =>
      httpResource<ReposRemoveTeamAccessRestrictionsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
        method: 'DELETE',
        body,
      }));
  },
});
