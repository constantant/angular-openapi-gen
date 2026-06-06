import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesGetMilestoneResponse =
  paths['/repos/{owner}/{repo}/milestones/{milestone_number}']['get']['responses']['200']['content']['application/json'];

export const ISSUES_GET_MILESTONE = new InjectionToken<
  (
    owner: string,
    repo: string,
    milestoneNumber: string,
  ) => ReturnType<typeof httpResource<IssuesGetMilestoneResponse>>
>('ISSUES_GET_MILESTONE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, milestoneNumber: string) =>
      httpResource<IssuesGetMilestoneResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/milestones/${milestoneNumber}`,
      }));
  },
});
