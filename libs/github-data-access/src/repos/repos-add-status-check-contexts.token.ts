import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposAddStatusCheckContextsBody = NonNullable<
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['post']['requestBody']
>['content']['application/json'];

type ReposAddStatusCheckContextsResponse =
  paths['/repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts']['post']['responses']['200']['content']['application/json'];

export const REPOS_ADD_STATUS_CHECK_CONTEXTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    branch: string,
    body:
      | ReposAddStatusCheckContextsBody
      | Signal<ReposAddStatusCheckContextsBody>,
  ) => ReturnType<typeof httpResource<ReposAddStatusCheckContextsResponse>>
>('REPOS_ADD_STATUS_CHECK_CONTEXTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      branch: string,
      body:
        | ReposAddStatusCheckContextsBody
        | Signal<ReposAddStatusCheckContextsBody>,
    ) =>
      httpResource<ReposAddStatusCheckContextsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/branches/${branch}/protection/required_status_checks/contexts`,
        method: 'POST',
        body,
      }));
  },
});
