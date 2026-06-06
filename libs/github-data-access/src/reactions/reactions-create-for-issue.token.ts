import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReactionsCreateForIssueBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/reactions']['post']['requestBody']
>['content']['application/json'];

export type ReactionsCreateForIssueResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/reactions']['post']['responses']['200']['content']['application/json'];

export const REACTIONS_CREATE_FOR_ISSUE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: ReactionsCreateForIssueBody | Signal<ReactionsCreateForIssueBody>,
  ) => ReturnType<typeof httpResource<ReactionsCreateForIssueResponse>>
>('REACTIONS_CREATE_FOR_ISSUE');

export function provideReactionsCreateForIssue(): FactoryProvider {
  return {
    provide: REACTIONS_CREATE_FOR_ISSUE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        body: ReactionsCreateForIssueBody | Signal<ReactionsCreateForIssueBody>,
      ) =>
        httpResource<ReactionsCreateForIssueResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/reactions`,
          method: 'POST',
          body,
        }));
    },
  };
}
