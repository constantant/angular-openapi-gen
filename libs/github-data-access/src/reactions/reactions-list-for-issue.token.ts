import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsListForIssueParams =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/reactions']['get']['parameters']['query'];

export type ReactionsListForIssueResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/reactions']['get']['responses']['200']['content']['application/json'];

export const REACTIONS_LIST_FOR_ISSUE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    params?:
      | ReactionsListForIssueParams
      | (() => ReactionsListForIssueParams | undefined),
  ) => ReturnType<typeof httpResource<ReactionsListForIssueResponse>>
>('REACTIONS_LIST_FOR_ISSUE');

export function provideReactionsListForIssue(): FactoryProvider {
  return {
    provide: REACTIONS_LIST_FOR_ISSUE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        params?:
          | ReactionsListForIssueParams
          | (() => ReactionsListForIssueParams | undefined),
      ) =>
        httpResource<ReactionsListForIssueResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/reactions`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
