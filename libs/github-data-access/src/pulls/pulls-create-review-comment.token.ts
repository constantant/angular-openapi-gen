import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsCreateReviewCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/comments']['post']['requestBody']
>['content']['application/json'];

export type PullsCreateReviewCommentResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/comments']['post']['responses']['201']['content']['application/json'];

export const PULLS_CREATE_REVIEW_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    body: PullsCreateReviewCommentBody | Signal<PullsCreateReviewCommentBody>,
  ) => ReturnType<typeof httpResource<PullsCreateReviewCommentResponse>>
>('PULLS_CREATE_REVIEW_COMMENT');

export function providePullsCreateReviewComment(): FactoryProvider {
  return {
    provide: PULLS_CREATE_REVIEW_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        pullNumber: string,
        body:
          | PullsCreateReviewCommentBody
          | Signal<PullsCreateReviewCommentBody>,
      ) =>
        httpResource<PullsCreateReviewCommentResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/comments`,
          method: 'POST',
          body,
        }));
    },
  };
}
