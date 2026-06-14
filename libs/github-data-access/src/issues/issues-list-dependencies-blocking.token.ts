import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListDependenciesBlockingParams =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocking']['get']['parameters']['query'];

export type IssuesListDependenciesBlockingResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/dependencies/blocking']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_DEPENDENCIES_BLOCKING = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    params?:
      | IssuesListDependenciesBlockingParams
      | (() => IssuesListDependenciesBlockingParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListDependenciesBlockingResponse>>
>('ISSUES_LIST_DEPENDENCIES_BLOCKING');

export function provideIssuesListDependenciesBlocking(): FactoryProvider {
  return {
    provide: ISSUES_LIST_DEPENDENCIES_BLOCKING,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        params?:
          | IssuesListDependenciesBlockingParams
          | (() => IssuesListDependenciesBlockingParams | undefined),
      ) =>
        httpResource<IssuesListDependenciesBlockingResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/dependencies/blocking`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
