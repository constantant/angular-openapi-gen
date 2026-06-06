import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsCreateBody = NonNullable<
  paths['/repos/{owner}/{repo}/pulls']['post']['requestBody']
>['content']['application/json'];

export type PullsCreateResponse =
  paths['/repos/{owner}/{repo}/pulls']['post']['responses']['201']['content']['application/json'];

export const PULLS_CREATE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: PullsCreateBody | Signal<PullsCreateBody>,
  ) => ReturnType<typeof httpResource<PullsCreateResponse>>
>('PULLS_CREATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: PullsCreateBody | Signal<PullsCreateBody>,
    ) =>
      httpResource<PullsCreateResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls`,
        method: 'POST',
        body,
      }));
  },
});
