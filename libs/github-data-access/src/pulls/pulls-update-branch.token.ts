import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsUpdateBranchBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/update-branch']['put']['requestBody']
>['content']['application/json'];

export const PULLS_UPDATE_BRANCH = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    body: PullsUpdateBranchBody | Signal<PullsUpdateBranchBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('PULLS_UPDATE_BRANCH', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      body: PullsUpdateBranchBody | Signal<PullsUpdateBranchBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/update-branch`,
        method: 'PUT',
        body,
      }));
  },
});
