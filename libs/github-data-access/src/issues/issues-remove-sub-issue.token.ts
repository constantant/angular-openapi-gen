import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesRemoveSubIssueBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/sub_issue']['delete']['requestBody']
>['content']['application/json'];

export type IssuesRemoveSubIssueResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/sub_issue']['delete']['responses']['200']['content']['application/json'];

export const ISSUES_REMOVE_SUB_ISSUE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesRemoveSubIssueBody | Signal<IssuesRemoveSubIssueBody>,
  ) => ReturnType<typeof httpResource<IssuesRemoveSubIssueResponse>>
>('ISSUES_REMOVE_SUB_ISSUE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      body: IssuesRemoveSubIssueBody | Signal<IssuesRemoveSubIssueBody>,
    ) =>
      httpResource<IssuesRemoveSubIssueResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/sub_issue`,
        method: 'DELETE',
        body,
      }));
  },
});
