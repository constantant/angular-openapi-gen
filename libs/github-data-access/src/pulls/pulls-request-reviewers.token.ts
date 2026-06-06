import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsRequestReviewersBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers']['post']['requestBody']
>['content']['application/json'];

export type PullsRequestReviewersResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers']['post']['responses']['201']['content']['application/json'];

export const PULLS_REQUEST_REVIEWERS = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    body: PullsRequestReviewersBody | Signal<PullsRequestReviewersBody>,
  ) => ReturnType<typeof httpResource<PullsRequestReviewersResponse>>
>('PULLS_REQUEST_REVIEWERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      body: PullsRequestReviewersBody | Signal<PullsRequestReviewersBody>,
    ) =>
      httpResource<PullsRequestReviewersResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`,
        method: 'POST',
        body,
      }));
  },
});
