import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesAddIssueFieldValuesBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values']['post']['requestBody']
>['content']['application/json'];

export type IssuesAddIssueFieldValuesResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/issue-field-values']['post']['responses']['200']['content']['application/json'];

export const ISSUES_ADD_ISSUE_FIELD_VALUES = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesAddIssueFieldValuesBody | Signal<IssuesAddIssueFieldValuesBody>,
  ) => ReturnType<typeof httpResource<IssuesAddIssueFieldValuesResponse>>
>('ISSUES_ADD_ISSUE_FIELD_VALUES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      body:
        | IssuesAddIssueFieldValuesBody
        | Signal<IssuesAddIssueFieldValuesBody>,
    ) =>
      httpResource<IssuesAddIssueFieldValuesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/issue-field-values`,
        method: 'POST',
        body,
      }));
  },
});
