import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const ISSUES_UNLOCK = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('ISSUES_UNLOCK', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, issueNumber: string) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}/lock`,
        method: 'DELETE',
      }));
  },
});
