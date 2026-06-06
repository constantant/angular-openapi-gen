import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksRerequestSuiteResponse =
  paths['/repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest']['post']['responses']['201']['content']['application/json'];

export const CHECKS_REREQUEST_SUITE = new InjectionToken<
  (
    owner: string,
    repo: string,
    checkSuiteId: string,
  ) => ReturnType<typeof httpResource<ChecksRerequestSuiteResponse>>
>('CHECKS_REREQUEST_SUITE');

export function provideChecksRerequestSuite(): FactoryProvider {
  return {
    provide: CHECKS_REREQUEST_SUITE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, checkSuiteId: string) =>
        httpResource<ChecksRerequestSuiteResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/check-suites/${checkSuiteId}/rerequest`,
          method: 'POST',
        }));
    },
  };
}
