import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesCreateMilestoneBody = NonNullable<
  paths['/repos/{owner}/{repo}/milestones']['post']['requestBody']
>['content']['application/json'];

export type IssuesCreateMilestoneResponse =
  paths['/repos/{owner}/{repo}/milestones']['post']['responses']['201']['content']['application/json'];

export const ISSUES_CREATE_MILESTONE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: IssuesCreateMilestoneBody | Signal<IssuesCreateMilestoneBody>,
  ) => ReturnType<typeof httpResource<IssuesCreateMilestoneResponse>>
>('ISSUES_CREATE_MILESTONE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: IssuesCreateMilestoneBody | Signal<IssuesCreateMilestoneBody>,
    ) =>
      httpResource<IssuesCreateMilestoneResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/milestones`,
        method: 'POST',
        body,
      }));
  },
});
