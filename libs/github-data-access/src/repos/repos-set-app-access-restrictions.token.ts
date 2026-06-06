import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposSetAppAccessRestrictionsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps']['put']['requestBody']
>['content']['application/json'];

export type ReposSetAppAccessRestrictionsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps']['put']['responses']['200']['content']['application/json'];

export const REPOS_SET_APP_ACCESS_RESTRICTIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposSetAppAccessRestrictionsBody
      | Signal<ReposSetAppAccessRestrictionsBody>,
  ) => ReturnType<typeof httpResource<ReposSetAppAccessRestrictionsResponse>>
>('REPOS_SET_APP_ACCESS_RESTRICTIONS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      body:
        | ReposSetAppAccessRestrictionsBody
        | Signal<ReposSetAppAccessRestrictionsBody>,
    ) =>
      httpResource<ReposSetAppAccessRestrictionsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/restrictions/apps`,
        method: 'PUT',
        body,
      }));
  },
});
