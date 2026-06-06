import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsRemoveRequestedReviewersBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers']['delete']['requestBody']
>['content']['application/json'];

export type PullsRemoveRequestedReviewersResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers']['delete']['responses']['200']['content']['application/json'];

export const PULLS_REMOVE_REQUESTED_REVIEWERS = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    body:
      | PullsRemoveRequestedReviewersBody
      | Signal<PullsRemoveRequestedReviewersBody>,
  ) => ReturnType<typeof httpResource<PullsRemoveRequestedReviewersResponse>>
>('PULLS_REMOVE_REQUESTED_REVIEWERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      body:
        | PullsRemoveRequestedReviewersBody
        | Signal<PullsRemoveRequestedReviewersBody>,
    ) =>
      httpResource<PullsRemoveRequestedReviewersResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`,
        method: 'DELETE',
        body,
      }));
  },
});
