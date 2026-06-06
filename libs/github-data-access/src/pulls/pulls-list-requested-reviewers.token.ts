import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsListRequestedReviewersResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers']['get']['responses']['200']['content']['application/json'];

export const PULLS_LIST_REQUESTED_REVIEWERS = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
  ) => ReturnType<typeof httpResource<PullsListRequestedReviewersResponse>>
>('PULLS_LIST_REQUESTED_REVIEWERS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, pullNumber: string) =>
      httpResource<PullsListRequestedReviewersResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/requested_reviewers`,
      }));
  },
});
