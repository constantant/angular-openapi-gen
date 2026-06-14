import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesCreateCommentBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/comments']['post']['requestBody']
>['content']['application/json'];

export type IssuesCreateCommentResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/comments']['post']['responses']['201']['content']['application/json'];

export const ISSUES_CREATE_COMMENT = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesCreateCommentBody | Signal<IssuesCreateCommentBody>,
  ) => ReturnType<typeof httpResource<IssuesCreateCommentResponse>>
>('ISSUES_CREATE_COMMENT');

export function provideIssuesCreateComment(): FactoryProvider {
  return {
    provide: ISSUES_CREATE_COMMENT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        body: IssuesCreateCommentBody | Signal<IssuesCreateCommentBody>,
      ) =>
        httpResource<IssuesCreateCommentResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/comments`,
          method: 'POST',
          body,
        }));
    },
  };
}
