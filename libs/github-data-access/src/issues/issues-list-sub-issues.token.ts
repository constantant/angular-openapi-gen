import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListSubIssuesParams =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/sub_issues']['get']['parameters']['query'];

export type IssuesListSubIssuesResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/sub_issues']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_SUB_ISSUES = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    params?:
      | IssuesListSubIssuesParams
      | (() => IssuesListSubIssuesParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListSubIssuesResponse>>
>('ISSUES_LIST_SUB_ISSUES');

export function provideIssuesListSubIssues(): FactoryProvider {
  return {
    provide: ISSUES_LIST_SUB_ISSUES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        params?:
          | IssuesListSubIssuesParams
          | (() => IssuesListSubIssuesParams | undefined),
      ) =>
        httpResource<IssuesListSubIssuesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/sub_issues`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
