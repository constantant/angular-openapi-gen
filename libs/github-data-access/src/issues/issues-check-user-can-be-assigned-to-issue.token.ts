import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ISSUES_CHECK_USER_CAN_BE_ASSIGNED_TO_ISSUE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    assignee: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ISSUES_CHECK_USER_CAN_BE_ASSIGNED_TO_ISSUE');

export function provideIssuesCheckUserCanBeAssignedToIssue(): FactoryProvider {
  return {
    provide: ISSUES_CHECK_USER_CAN_BE_ASSIGNED_TO_ISSUE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        assignee: string,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/assignees/${assignee}`,
        }));
    },
  };
}
