import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesGetParentResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/parent']['get']['responses']['200']['content']['application/json'];

export const ISSUES_GET_PARENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
  ) => ReturnType<typeof httpResource<IssuesGetParentResponse>>
>('ISSUES_GET_PARENT');

export function provideIssuesGetParent(): FactoryProvider {
  return {
    provide: ISSUES_GET_PARENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, issueNumber: string) =>
        httpResource<IssuesGetParentResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/parent`,
        }));
    },
  };
}
