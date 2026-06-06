import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposAddUserAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users']['post']['requestBody']
>['content']['application/json'];

type ReposAddUserAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users']['post']['responses']['200']['content']['application/json'];

export const REPOS_ADD_USER_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposAddUserAccessRestrictionsBody
      | Signal<ReposAddUserAccessRestrictionsBody>,
  ) => ReturnType<typeof httpResource<ReposAddUserAccessRestrictionsResponse>>
>('REPOS_ADD_USER_ACCESS_RESTRICTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      body:
        | ReposAddUserAccessRestrictionsBody
        | Signal<ReposAddUserAccessRestrictionsBody>,
    ) =>
      httpResource<ReposAddUserAccessRestrictionsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`,
        method: 'POST',
        body,
      }));
  },
});
