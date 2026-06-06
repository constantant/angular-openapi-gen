import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListEventsParams =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/events']['get']['parameters']['query'];

export type IssuesListEventsResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/events']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_EVENTS = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    params?:
      | IssuesListEventsParams
      | (() => IssuesListEventsParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListEventsResponse>>
>('ISSUES_LIST_EVENTS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      params?:
        | IssuesListEventsParams
        | (() => IssuesListEventsParams | undefined),
    ) =>
      httpResource<IssuesListEventsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/events`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
