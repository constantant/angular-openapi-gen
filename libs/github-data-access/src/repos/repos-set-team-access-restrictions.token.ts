import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposSetTeamAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams']['put']['requestBody']
>['content']['application/json'];

export type ReposSetTeamAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams']['put']['responses']['200']['content']['application/json'];

export const REPOS_SET_TEAM_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposSetTeamAccessRestrictionsBody
      | Signal<ReposSetTeamAccessRestrictionsBody>,
  ) => ReturnType<typeof httpResource<ReposSetTeamAccessRestrictionsResponse>>
>('REPOS_SET_TEAM_ACCESS_RESTRICTIONS');

export function provideReposSetTeamAccessRestrictions(): FactoryProvider {
  return {
    provide: REPOS_SET_TEAM_ACCESS_RESTRICTIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposSetTeamAccessRestrictionsBody
          | Signal<ReposSetTeamAccessRestrictionsBody>,
      ) =>
        httpResource<ReposSetTeamAccessRestrictionsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/teams`,
          method: 'PUT',
          body,
        }));
    },
  };
}
