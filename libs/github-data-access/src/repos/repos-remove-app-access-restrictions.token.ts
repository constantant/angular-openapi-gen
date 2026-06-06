import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRemoveAppAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps']['delete']['requestBody']
>['content']['application/json'];

export type ReposRemoveAppAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps']['delete']['responses']['200']['content']['application/json'];

export const REPOS_REMOVE_APP_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposRemoveAppAccessRestrictionsBody
      | Signal<ReposRemoveAppAccessRestrictionsBody>,
  ) => ReturnType<typeof httpResource<ReposRemoveAppAccessRestrictionsResponse>>
>('REPOS_REMOVE_APP_ACCESS_RESTRICTIONS');

export function provideReposRemoveAppAccessRestrictions(): FactoryProvider {
  return {
    provide: REPOS_REMOVE_APP_ACCESS_RESTRICTIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposRemoveAppAccessRestrictionsBody
          | Signal<ReposRemoveAppAccessRestrictionsBody>,
      ) =>
        httpResource<ReposRemoveAppAccessRestrictionsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
