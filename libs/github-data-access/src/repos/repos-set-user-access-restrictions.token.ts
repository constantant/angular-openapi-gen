import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposSetUserAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users']['put']['requestBody']
>['content']['application/json'];

export type ReposSetUserAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users']['put']['responses']['200']['content']['application/json'];

export const REPOS_SET_USER_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposSetUserAccessRestrictionsBody
      | Signal<ReposSetUserAccessRestrictionsBody>,
  ) => ReturnType<typeof httpResource<ReposSetUserAccessRestrictionsResponse>>
>('REPOS_SET_USER_ACCESS_RESTRICTIONS');

export function provideReposSetUserAccessRestrictions(): FactoryProvider {
  return {
    provide: REPOS_SET_USER_ACCESS_RESTRICTIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        branch: string,
        body:
          | ReposSetUserAccessRestrictionsBody
          | Signal<ReposSetUserAccessRestrictionsBody>,
      ) =>
        httpResource<ReposSetUserAccessRestrictionsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`,
          method: 'PUT',
          body,
        }));
    },
  };
}
