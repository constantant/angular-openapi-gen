import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SearchIssuesAndPullRequestsParams =
  paths['/search/issues']['get']['parameters']['query'];

export type SearchIssuesAndPullRequestsResponse =
  paths['/search/issues']['get']['responses']['200']['content']['application/json'];

export const SEARCH_ISSUES_AND_PULL_REQUESTS = new InjectionToken<
  (
    params?:
      | SearchIssuesAndPullRequestsParams
      | (() => SearchIssuesAndPullRequestsParams | undefined),
  ) => ReturnType<typeof httpResource<SearchIssuesAndPullRequestsResponse>>
>('SEARCH_ISSUES_AND_PULL_REQUESTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      params?:
        | SearchIssuesAndPullRequestsParams
        | (() => SearchIssuesAndPullRequestsParams | undefined),
    ) =>
      httpResource<SearchIssuesAndPullRequestsResponse>(() => ({
        url: `${base}/search/issues`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
