import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type IssuesCreateBody = NonNullable<
  paths['/repos/{owner}/{repo}/issues']['post']['requestBody']
>['content']['application/json'];

export type IssuesCreateResponse =
  paths['/repos/{owner}/{repo}/issues']['post']['responses']['201']['content']['application/json'];

export const ISSUES_CREATE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: IssuesCreateBody | Signal<IssuesCreateBody>,
  ) => ReturnType<typeof httpResource<IssuesCreateResponse>>
>('ISSUES_CREATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: IssuesCreateBody | Signal<IssuesCreateBody>,
    ) =>
      httpResource<IssuesCreateResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/issues`,
        method: 'POST',
        body,
      }));
  },
});
