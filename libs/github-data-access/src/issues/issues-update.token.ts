import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesUpdateBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}']['patch']['requestBody']
>['content']['application/json'];

export type IssuesUpdateResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}']['patch']['responses']['200']['content']['application/json'];

export const ISSUES_UPDATE = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesUpdateBody | Signal<IssuesUpdateBody>,
  ) => ReturnType<typeof httpResource<IssuesUpdateResponse>>
>('ISSUES_UPDATE');

export function provideIssuesUpdate(): FactoryProvider {
  return {
    provide: ISSUES_UPDATE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        issueNumber: string,
        body: IssuesUpdateBody | Signal<IssuesUpdateBody>,
      ) =>
        httpResource<IssuesUpdateResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
