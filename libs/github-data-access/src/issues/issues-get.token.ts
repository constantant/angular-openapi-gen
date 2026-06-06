import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesGetResponse =
  paths['/repos/{owner}/{repo}/issues/{issue_number}']['get']['responses']['200']['content']['application/json'];

export const ISSUES_GET = new InjectionToken<
  (
    owner: string,
    repo: string,
    issueNumber: string,
  ) => ReturnType<typeof httpResource<IssuesGetResponse>>
>('ISSUES_GET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, issueNumber: string) =>
      httpResource<IssuesGetResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues/${issueNumber}`,
      }));
  },
});
