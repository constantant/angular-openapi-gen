import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposRemoveUserAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users']['delete']['requestBody']
>['content']['application/json'];

export type ReposRemoveUserAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users']['delete']['responses']['200']['content']['application/json'];

export const REPOS_REMOVE_USER_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposRemoveUserAccessRestrictionsBody
      | Signal<ReposRemoveUserAccessRestrictionsBody>,
  ) => ReturnType<
    typeof httpResource<ReposRemoveUserAccessRestrictionsResponse>
  >
>('REPOS_REMOVE_USER_ACCESS_RESTRICTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      body:
        | ReposRemoveUserAccessRestrictionsBody
        | Signal<ReposRemoveUserAccessRestrictionsBody>,
    ) =>
      httpResource<ReposRemoveUserAccessRestrictionsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/users`,
        method: 'DELETE',
        body,
      }));
  },
});
