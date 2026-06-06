import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksCreateBody = NonNullable<
  paths['/repos/{owner}/{repo}/check-runs']['post']['requestBody']
>['content']['application/json'];

export type ChecksCreateResponse =
  paths['/repos/{owner}/{repo}/check-runs']['post']['responses']['201']['content']['application/json'];

export const CHECKS_CREATE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ChecksCreateBody | Signal<ChecksCreateBody>,
  ) => ReturnType<typeof httpResource<ChecksCreateResponse>>
>('CHECKS_CREATE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: ChecksCreateBody | Signal<ChecksCreateBody>,
    ) =>
      httpResource<ChecksCreateResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/check-runs`,
        method: 'POST',
        body,
      }));
  },
});
