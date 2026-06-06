import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesListAssigneesParams =
  paths['/repos/{owner}/{repo}/assignees']['get']['parameters']['query'];

export type IssuesListAssigneesResponse =
  paths['/repos/{owner}/{repo}/assignees']['get']['responses']['200']['content']['application/json'];

export const ISSUES_LIST_ASSIGNEES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | IssuesListAssigneesParams
      | (() => IssuesListAssigneesParams | undefined),
  ) => ReturnType<typeof httpResource<IssuesListAssigneesResponse>>
>('ISSUES_LIST_ASSIGNEES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | IssuesListAssigneesParams
        | (() => IssuesListAssigneesParams | undefined),
    ) =>
      httpResource<IssuesListAssigneesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/assignees`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
