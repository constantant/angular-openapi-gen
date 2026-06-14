import { InjectionToken, inject, FactoryProvider } from '@angular/core';
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
>('ISSUES_LIST_EVENTS');

export function provideIssuesListEvents(): FactoryProvider {
  return {
    provide: ISSUES_LIST_EVENTS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        params?:
          | IssuesListEventsParams
          | (() => IssuesListEventsParams | undefined),
      ) =>
        httpResource<IssuesListEventsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/events`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
