import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsMergeBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/merge']['put']['requestBody']
>['content']['application/json'];

export type PullsMergeResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/merge']['put']['responses']['200']['content']['application/json'];

export const PULLS_MERGE = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    body: PullsMergeBody | Signal<PullsMergeBody>,
  ) => ReturnType<typeof httpResource<PullsMergeResponse>>
>('PULLS_MERGE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      body: PullsMergeBody | Signal<PullsMergeBody>,
    ) =>
      httpResource<PullsMergeResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/merge`,
        method: 'PUT',
        body,
      }));
  },
});
