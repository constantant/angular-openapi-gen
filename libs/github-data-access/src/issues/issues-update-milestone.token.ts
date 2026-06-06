import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesUpdateMilestoneBody = NonNullable<
  paths['/repos/{owner}/{repo}/milestones/{milestone_number}']['patch']['requestBody']
>['content']['application/json'];

export type IssuesUpdateMilestoneResponse =
  paths['/repos/{owner}/{repo}/milestones/{milestone_number}']['patch']['responses']['200']['content']['application/json'];

export const ISSUES_UPDATE_MILESTONE = new InjectionToken<
  (
    owner: string,
    repo: string,
    milestoneNumber: string,
    body: IssuesUpdateMilestoneBody | Signal<IssuesUpdateMilestoneBody>,
  ) => ReturnType<typeof httpResource<IssuesUpdateMilestoneResponse>>
>('ISSUES_UPDATE_MILESTONE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      milestoneNumber: string,
      body: IssuesUpdateMilestoneBody | Signal<IssuesUpdateMilestoneBody>,
    ) =>
      httpResource<IssuesUpdateMilestoneResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/milestones/${milestoneNumber}`,
        method: 'PATCH',
        body,
      }));
  },
});
