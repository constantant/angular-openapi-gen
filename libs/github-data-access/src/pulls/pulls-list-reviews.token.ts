import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsListReviewsParams =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews']['get']['parameters']['query'];

export type PullsListReviewsResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/reviews']['get']['responses']['200']['content']['application/json'];

export const PULLS_LIST_REVIEWS = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    params?:
      | PullsListReviewsParams
      | (() => PullsListReviewsParams | undefined),
  ) => ReturnType<typeof httpResource<PullsListReviewsResponse>>
>('PULLS_LIST_REVIEWS');

export function providePullsListReviews(): FactoryProvider {
  return {
    provide: PULLS_LIST_REVIEWS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        pullNumber: string,
        params?:
          | PullsListReviewsParams
          | (() => PullsListReviewsParams | undefined),
      ) =>
        httpResource<PullsListReviewsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
