import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListCommentsParams =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/comments']['get']['parameters']['query'];

export type IssuesListCommentsResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/comments']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_COMMENTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    params?:
      | IssuesListCommentsParams
      | (() => IssuesListCommentsParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListCommentsResponse>>
>('ISSUES_LIST_COMMENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      params?:
        | IssuesListCommentsParams
        | (() => IssuesListCommentsParams | undefined),
    ) =>
      httpResource<IssuesListCommentsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
