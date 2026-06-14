import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesRemoveDependencyBlockedByResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by/{issue_id}']['delete']['responses']['200']['content']['application/json'];

export const ISSUES_REMOVE_DEPENDENCY_BLOCKED_BY = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    issueId: string,
  ) => ReturnType<typeof httpResource<IssuesRemoveDependencyBlockedByResponse>>
>('ISSUES_REMOVE_DEPENDENCY_BLOCKED_BY');

export function provideIssuesRemoveDependencyBlockedBy(): FactoryProvider {
  return {
    provide: ISSUES_REMOVE_DEPENDENCY_BLOCKED_BY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        issueId: string,
      ) =>
        httpResource<IssuesRemoveDependencyBlockedByResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/dependencies/blocked_by/${issueId}`,
          method: 'DELETE',
        }));
    },
  };
}
