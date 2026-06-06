import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListLabelsForMilestoneParams =
  paths['/repos/{owner}/{repo}/milestones/{milestone_number}/labels']['get']['parameters']['query'];

export type IssuesListLabelsForMilestoneResponse =
  paths['/repos/{owner}/{repo}/milestones/{milestone_number}/labels']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_LABELS_FOR_MILESTONE = new InjectionToken<
  (
    owner: string,
    repo: string,
    milestoneNumber: string,
    params?:
      | IssuesListLabelsForMilestoneParams
      | (() => IssuesListLabelsForMilestoneParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListLabelsForMilestoneResponse>>
>('ISSUES_LIST_LABELS_FOR_MILESTONE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      milestoneNumber: string,
      params?:
        | IssuesListLabelsForMilestoneParams
        | (() => IssuesListLabelsForMilestoneParams | undefined),
    ) =>
      httpResource<IssuesListLabelsForMilestoneResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/milestones/${milestoneNumber}/labels`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
