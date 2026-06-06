import { InjectionToken, inject } from '@angular/core';
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
>('ISSUES_LIST_LABELS_ON_ISSUE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      params?:
        | IssuesListLabelsOnIssueParams
        | (() => IssuesListLabelsOnIssueParams | undefined),
    ) =>
      httpResource<IssuesListLabelsOnIssueResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
