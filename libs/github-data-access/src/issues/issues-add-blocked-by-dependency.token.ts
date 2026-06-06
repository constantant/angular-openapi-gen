import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesAddBlockedByDependencyBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by']['post']['requestBody']
>['content']['application/json'];

export type IssuesAddBlockedByDependencyResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by']['post']['responses']['201']['content']['application/json'];

export const ISSUES_ADD_BLOCKED_BY_DEPENDENCY = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body:
      | IssuesAddBlockedByDependencyBody
      | Signal<IssuesAddBlockedByDependencyBody>,
  ) => ReturnType<typeof httpResource<IssuesAddBlockedByDependencyResponse>>
>('ISSUES_ADD_BLOCKED_BY_DEPENDENCY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      body:
        | IssuesAddBlockedByDependencyBody
        | Signal<IssuesAddBlockedByDependencyBody>,
    ) =>
      httpResource<IssuesAddBlockedByDependencyResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/dependencies/blocked_by`,
        method: 'POST',
        body,
      }));
  },
});
