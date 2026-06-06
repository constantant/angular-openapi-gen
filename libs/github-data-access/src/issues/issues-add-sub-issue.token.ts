import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesAddSubIssueBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/sub_issues']['post']['requestBody']
>['content']['application/json'];

export type IssuesAddSubIssueResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/sub_issues']['post']['responses']['201']['content']['application/json'];

export const ISSUES_ADD_SUB_ISSUE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesAddSubIssueBody | Signal<IssuesAddSubIssueBody>,
  ) => ReturnType<typeof httpResource<IssuesAddSubIssueResponse>>
>('ISSUES_ADD_SUB_ISSUE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      body: IssuesAddSubIssueBody | Signal<IssuesAddSubIssueBody>,
    ) =>
      httpResource<IssuesAddSubIssueResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/sub_issues`,
        method: 'POST',
        body,
      }));
  },
});
