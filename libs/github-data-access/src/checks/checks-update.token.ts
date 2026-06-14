import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksUpdateBody = NonNullable<
  paths['/repos/{owner}/{repo}/check-runs/{check_run_id}']['patch']['requestBody']
>['content']['application/json'];

export type ChecksUpdateResponse =
  paths['/repos/{owner}/{repo}/check-runs/{check_run_id}']['patch']['responses']['200']['content']['application/json'];

export const CHECKS_UPDATE = new InjectionToken<
  (
    owner: string,
    repo: string,
    checkRunId: string,
    body: ChecksUpdateBody | Signal<ChecksUpdateBody>,
  ) => ReturnType<typeof httpResource<ChecksUpdateResponse>>
>('CHECKS_UPDATE');

export function provideChecksUpdate(): FactoryProvider {
  return {
    provide: CHECKS_UPDATE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        checkRunId: string,
        body: ChecksUpdateBody | Signal<ChecksUpdateBody>,
      ) =>
        httpResource<ChecksUpdateResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/check-runs/${checkRunId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
