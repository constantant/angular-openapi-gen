import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksGetResponse =
  paths['/repos/{owner}/{repo}/check-runs/{check_run_id}']['get']['responses']['200']['content']['application/json'];

export const CHECKS_GET = new InjectionToken<
  (
    owner: string,
    repo: string,
    checkRunId: string,
  ) => ReturnType<typeof httpResource<ChecksGetResponse>>
>('CHECKS_GET');

export function provideChecksGet(): FactoryProvider {
  return {
    provide: CHECKS_GET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, checkRunId: string) =>
        httpResource<ChecksGetResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/check-runs/${checkRunId}`,
        }));
    },
  };
}
