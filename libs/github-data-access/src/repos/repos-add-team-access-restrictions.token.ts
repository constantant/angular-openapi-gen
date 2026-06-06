import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposAddTeamAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams']['post']['requestBody']
>['content']['application/json'];

export type ReposAddTeamAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams']['post']['responses']['200']['content']['application/json'];

export const REPOS_ADD_TEAM_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposAddTeamAccessRestrictionsBody
      | Signal<ReposAddTeamAccessRestrictionsBody>,
  ) => ReturnType<typeof httpResource<ReposAddTeamAccessRestrictionsResponse>>
>('REPOS_ADD_TEAM_ACCESS_RESTRICTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      body:
        | ReposAddTeamAccessRestrictionsBody
        | Signal<ReposAddTeamAccessRestrictionsBody>,
    ) =>
      httpResource<ReposAddTeamAccessRestrictionsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
        method: 'POST',
        body,
      }));
  },
});
