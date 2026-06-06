import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ISSUES_CHECK_USER_CAN_BE_ASSIGNED = new InjectionToken<
  (
    owner: string,
    repo: string,
    assignee: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ISSUES_CHECK_USER_CAN_BE_ASSIGNED', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, assignee: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/assignees/${assignee}`,
      }));
  },
});
