import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ChecksListAnnotationsParams =
  paths['/repos/{owner}/{repo}/check-runs/{check_run_id}/annotations']['get']['parameters']['query'];

export type ChecksListAnnotationsResponse =
  paths['/repos/{owner}/{repo}/check-runs/{check_run_id}/annotations']['get']['responses']['200']['content']['application/json'];

export const CHECKS_LIST_ANNOTATIONS = new InjectionToken<
  (
    owner: string,
    repo: string,
    checkRunId: string,
    params?:
      | ChecksListAnnotationsParams
      | (() => ChecksListAnnotationsParams | undefined),
  ) => ReturnType<typeof httpResource<ChecksListAnnotationsResponse>>
>('CHECKS_LIST_ANNOTATIONS');

export function provideChecksListAnnotations(): FactoryProvider {
  return {
    provide: CHECKS_LIST_ANNOTATIONS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        checkRunId: string,
        params?:
          | ChecksListAnnotationsParams
          | (() => ChecksListAnnotationsParams | undefined),
      ) =>
        httpResource<ChecksListAnnotationsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/check-runs/${checkRunId}/annotations`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
