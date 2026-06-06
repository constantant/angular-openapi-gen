import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsCreateReviewBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews']['post']['requestBody']
>['content']['application/json'];

export type PullsCreateReviewResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews']['post']['responses']['200']['content']['application/json'];

export const PULLS_CREATE_REVIEW = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    body: PullsCreateReviewBody | Signal<PullsCreateReviewBody>,
  ) => ReturnType<typeof httpResource<PullsCreateReviewResponse>>
>('PULLS_CREATE_REVIEW');

export function providePullsCreateReview(): FactoryProvider {
  return {
    provide: PULLS_CREATE_REVIEW,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        pullNumber: string,
        body: PullsCreateReviewBody | Signal<PullsCreateReviewBody>,
      ) =>
        httpResource<PullsCreateReviewResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
          method: 'POST',
          body,
        }));
    },
  };
}
