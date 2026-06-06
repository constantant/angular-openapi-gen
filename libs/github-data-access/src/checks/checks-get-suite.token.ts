import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksGetSuiteResponse =
  paths['/repos/{owner}/{repo}/check-suites/{check_suite_id}']['get']['responses']['200']['content']['application/json'];

export const CHECKS_GET_SUITE = new InjectionToken<
  (
    owner: string,
    repo: string,
    checkSuiteId: string,
  ) => ReturnType<typeof httpResource<ChecksGetSuiteResponse>>
>('CHECKS_GET_SUITE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, checkSuiteId: string) =>
      httpResource<ChecksGetSuiteResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/check-suites/${checkSuiteId}`,
      }));
  },
});
