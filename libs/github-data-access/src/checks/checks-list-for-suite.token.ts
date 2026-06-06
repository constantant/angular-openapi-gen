import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksListForSuiteParams =
  paths['/repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs']['get']['parameters']['query'];

export type ChecksListForSuiteResponse =
  paths['/repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs']['get']['responses']['200']['content']['application/json'];

export const CHECKS_LIST_FOR_SUITE = new InjectionToken<
  (
    owner: string,
    repo: string,
    checkSuiteId: string,
    params?:
      | ChecksListForSuiteParams
      | (() => ChecksListForSuiteParams | undefined),
  ) => ReturnType<typeof httpResource<ChecksListForSuiteResponse>>
>('CHECKS_LIST_FOR_SUITE', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      checkSuiteId: string,
      params?:
        | ChecksListForSuiteParams
        | (() => ChecksListForSuiteParams | undefined),
    ) =>
      httpResource<ChecksListForSuiteResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/check-suites/${checkSuiteId}/check-runs`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
