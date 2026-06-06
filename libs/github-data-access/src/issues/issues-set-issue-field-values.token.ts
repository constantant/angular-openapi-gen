import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesSetIssueFieldValuesBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values']['put']['requestBody']
>['content']['application/json'];

export type IssuesSetIssueFieldValuesResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values']['put']['responses']['200']['content']['application/json'];

export const ISSUES_SET_ISSUE_FIELD_VALUES = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesSetIssueFieldValuesBody | Signal<IssuesSetIssueFieldValuesBody>,
  ) => ReturnType<typeof httpResource<IssuesSetIssueFieldValuesResponse>>
>('ISSUES_SET_ISSUE_FIELD_VALUES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      body:
        | IssuesSetIssueFieldValuesBody
        | Signal<IssuesSetIssueFieldValuesBody>,
    ) =>
      httpResource<IssuesSetIssueFieldValuesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/issue-field-values`,
        method: 'PUT',
        body,
      }));
  },
});
