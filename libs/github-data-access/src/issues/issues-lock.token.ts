import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesLockBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/lock']['put']['requestBody']
>['content']['application/json'];

export const ISSUES_LOCK = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesLockBody | Signal<IssuesLockBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('ISSUES_LOCK');

export function provideIssuesLock(): FactoryProvider {
  return {
    provide: ISSUES_LOCK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        body: IssuesLockBody | Signal<IssuesLockBody>,
      ) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/lock`,
          method: 'PUT',
          body,
        }));
    },
  };
}
