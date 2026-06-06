import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesReprioritizeSubIssueBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/sub_issues/priority']['patch']['requestBody']
>['content']['application/json'];

export type IssuesReprioritizeSubIssueResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/sub_issues/priority']['patch']['responses']['200']['content']['application/json'];

export const ISSUES_REPRIORITIZE_SUB_ISSUE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body:
      | IssuesReprioritizeSubIssueBody
      | Signal<IssuesReprioritizeSubIssueBody>,
  ) => ReturnType<typeof httpResource<IssuesReprioritizeSubIssueResponse>>
>('ISSUES_REPRIORITIZE_SUB_ISSUE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      body:
        | IssuesReprioritizeSubIssueBody
        | Signal<IssuesReprioritizeSubIssueBody>,
    ) =>
      httpResource<IssuesReprioritizeSubIssueResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/sub_issues/priority`,
        method: 'PATCH',
        body,
      }));
  },
});
