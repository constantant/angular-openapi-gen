import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposAddAppAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps']['post']['requestBody']
>['content']['application/json'];

export type ReposAddAppAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps']['post']['responses']['200']['content']['application/json'];

export const REPOS_ADD_APP_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposAddAppAccessRestrictionsBody
      | Signal<ReposAddAppAccessRestrictionsBody>,
  ) => ReturnType<typeof httpResource<ReposAddAppAccessRestrictionsResponse>>
>('REPOS_ADD_APP_ACCESS_RESTRICTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      body:
        | ReposAddAppAccessRestrictionsBody
        | Signal<ReposAddAppAccessRestrictionsBody>,
    ) =>
      httpResource<ReposAddAppAccessRestrictionsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
        method: 'POST',
        body,
      }));
  },
});
