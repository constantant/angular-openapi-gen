import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListIssueFieldValuesForIssueParams =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values']['get']['parameters']['query'];

export type IssuesListIssueFieldValuesForIssueResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_ISSUE_FIELD_VALUES_FOR_ISSUE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    params?:
      | IssuesListIssueFieldValuesForIssueParams
      | (() => IssuesListIssueFieldValuesForIssueParams | undefined),
  ) => ReturnType<
    typeof httpResource<IssuesListIssueFieldValuesForIssueResponse>
  >
>('ISSUES_LIST_ISSUE_FIELD_VALUES_FOR_ISSUE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      params?:
        | IssuesListIssueFieldValuesForIssueParams
        | (() => IssuesListIssueFieldValuesForIssueParams | undefined),
    ) =>
      httpResource<IssuesListIssueFieldValuesForIssueResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/issue-field-values`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
