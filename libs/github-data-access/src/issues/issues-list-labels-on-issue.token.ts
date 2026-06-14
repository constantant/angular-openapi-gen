import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListLabelsOnIssueParams =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/labels']['get']['parameters']['query'];

export type IssuesListLabelsOnIssueResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/labels']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_LABELS_ON_ISSUE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    params?:
      | IssuesListLabelsOnIssueParams
      | (() => IssuesListLabelsOnIssueParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListLabelsOnIssueResponse>>
>('ISSUES_LIST_LABELS_ON_ISSUE');

export function provideIssuesListLabelsOnIssue(): FactoryProvider {
  return {
    provide: ISSUES_LIST_LABELS_ON_ISSUE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        params?:
          | IssuesListLabelsOnIssueParams
          | (() => IssuesListLabelsOnIssueParams | undefined),
      ) =>
        httpResource<IssuesListLabelsOnIssueResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
