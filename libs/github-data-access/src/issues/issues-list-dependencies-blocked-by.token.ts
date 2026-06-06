import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListDependenciesBlockedByParams =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by']['get']['parameters']['query'];

export type IssuesListDependenciesBlockedByResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocked_by']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_DEPENDENCIES_BLOCKED_BY = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    params?:
      | IssuesListDependenciesBlockedByParams
      | (() => IssuesListDependenciesBlockedByParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListDependenciesBlockedByResponse>>
>('ISSUES_LIST_DEPENDENCIES_BLOCKED_BY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      params?:
        | IssuesListDependenciesBlockedByParams
        | (() => IssuesListDependenciesBlockedByParams | undefined),
    ) =>
      httpResource<IssuesListDependenciesBlockedByResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/dependencies/blocked_by`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
