import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesAddLabelsBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/labels']['post']['requestBody']
>['content']['application/json'];

export type IssuesAddLabelsResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/labels']['post']['responses']['200']['content']['application/json'];

export const ISSUES_ADD_LABELS = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesAddLabelsBody | Signal<IssuesAddLabelsBody>,
  ) => ReturnType<typeof httpResource<IssuesAddLabelsResponse>>
>('ISSUES_ADD_LABELS');

export function provideIssuesAddLabels(): FactoryProvider {
  return {
    provide: ISSUES_ADD_LABELS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        body: IssuesAddLabelsBody | Signal<IssuesAddLabelsBody>,
      ) =>
        httpResource<IssuesAddLabelsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
          method: 'POST',
          body,
        }));
    },
  };
}
