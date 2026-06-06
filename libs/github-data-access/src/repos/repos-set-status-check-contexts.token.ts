import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposSetStatusCheckContextsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['put']['requestBody']
>['content']['application/json'];

export type ReposSetStatusCheckContextsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['put']['responses']['200']['content']['application/json'];

export const REPOS_SET_STATUS_CHECK_CONTEXTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposSetStatusCheckContextsBody
      | Signal<ReposSetStatusCheckContextsBody>,
  ) => ReturnType<typeof httpResource<ReposSetStatusCheckContextsResponse>>
>('REPOS_SET_STATUS_CHECK_CONTEXTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      body:
        | ReposSetStatusCheckContextsBody
        | Signal<ReposSetStatusCheckContextsBody>,
    ) =>
      httpResource<ReposSetStatusCheckContextsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
        method: 'PUT',
        body,
      }));
  },
});
