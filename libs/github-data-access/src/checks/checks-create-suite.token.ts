import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksCreateSuiteBody = NonNullable<
  paths['/repos/{owner}/{repo}/check-suites']['post']['requestBody']
>['content']['application/json'];

export type ChecksCreateSuiteResponse =
  paths['/repos/{owner}/{repo}/check-suites']['post']['responses']['200']['content']['application/json'];

export const CHECKS_CREATE_SUITE = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: ChecksCreateSuiteBody | Signal<ChecksCreateSuiteBody>,
  ) => ReturnType<typeof httpResource<ChecksCreateSuiteResponse>>
>('CHECKS_CREATE_SUITE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: ChecksCreateSuiteBody | Signal<ChecksCreateSuiteBody>,
    ) =>
      httpResource<ChecksCreateSuiteResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/check-suites`,
        method: 'POST',
        body,
      }));
  },
});
