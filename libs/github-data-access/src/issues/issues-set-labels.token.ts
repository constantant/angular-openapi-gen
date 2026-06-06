import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesSetLabelsBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues/{issue_number}/labels']['put']['requestBody']
>['content']['application/json'];

export type IssuesSetLabelsResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}/labels']['put']['responses']['200']['content']['application/json'];

export const ISSUES_SET_LABELS = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
    body: IssuesSetLabelsBody | Signal<IssuesSetLabelsBody>,
  ) => ReturnType<typeof httpResource<IssuesSetLabelsResponse>>
>('ISSUES_SET_LABELS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      issueNumber: string,
      body: IssuesSetLabelsBody | Signal<IssuesSetLabelsBody>,
    ) =>
      httpResource<IssuesSetLabelsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/labels`,
        method: 'PUT',
        body,
      }));
  },
});
