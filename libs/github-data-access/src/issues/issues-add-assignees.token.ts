import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesAddAssigneesBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/assignees']['post']['requestBody']
>['content']['application/json'];

export type IssuesAddAssigneesResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/assignees']['post']['responses']['201']['content']['application/json'];

export const ISSUES_ADD_ASSIGNEES = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesAddAssigneesBody | Signal<IssuesAddAssigneesBody>,
  ) => ReturnType<typeof httpResource<IssuesAddAssigneesResponse>>
>('ISSUES_ADD_ASSIGNEES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      body: IssuesAddAssigneesBody | Signal<IssuesAddAssigneesBody>,
    ) =>
      httpResource<IssuesAddAssigneesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/assignees`,
        method: 'POST',
        body,
      }));
  },
});
