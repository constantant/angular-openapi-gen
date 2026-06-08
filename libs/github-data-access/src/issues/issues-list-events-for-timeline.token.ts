import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListEventsForTimelineParams =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/timeline']['get']['parameters']['query'];

export type IssuesListEventsForTimelineResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/timeline']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_EVENTS_FOR_TIMELINE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    params?:
      | IssuesListEventsForTimelineParams
      | (() => IssuesListEventsForTimelineParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListEventsForTimelineResponse>>
>('ISSUES_LIST_EVENTS_FOR_TIMELINE');

export function provideIssuesListEventsForTimeline(): FactoryProvider {
  return {
    provide: ISSUES_LIST_EVENTS_FOR_TIMELINE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        params?:
          | IssuesListEventsForTimelineParams
          | (() => IssuesListEventsForTimelineParams | undefined),
      ) =>
        httpResource<IssuesListEventsForTimelineResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/timeline`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
