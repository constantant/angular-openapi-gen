import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ISSUES_DELETE_MILESTONE = new InjectionToken<
  (
    owner: string,
    repo: string,
    milestoneNumber: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ISSUES_DELETE_MILESTONE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, milestoneNumber: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/milestones/${milestoneNumber}`,
        method: 'DELETE',
      }));
  },
});
