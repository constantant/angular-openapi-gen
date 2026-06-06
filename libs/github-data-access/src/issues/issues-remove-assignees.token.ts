import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesRemoveAssigneesBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/assignees']['delete']['requestBody']
>['content']['application/json'];

export type IssuesRemoveAssigneesResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/assignees']['delete']['responses']['200']['content']['application/json'];

export const ISSUES_REMOVE_ASSIGNEES = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesRemoveAssigneesBody | Signal<IssuesRemoveAssigneesBody>,
  ) => ReturnType<typeof httpResource<IssuesRemoveAssigneesResponse>>
>('ISSUES_REMOVE_ASSIGNEES');

export function provideIssuesRemoveAssignees(): FactoryProvider {
  return {
    provide: ISSUES_REMOVE_ASSIGNEES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        body: IssuesRemoveAssigneesBody | Signal<IssuesRemoveAssigneesBody>,
      ) =>
        httpResource<IssuesRemoveAssigneesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/assignees`,
          method: 'DELETE',
          body,
        }));
    },
  };
}
