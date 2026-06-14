import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningListAlertInstancesParams =
  paths['/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances']['get']['parameters']['query'];

export type CodeScanningListAlertInstancesResponse =
  paths['/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_LIST_ALERT_INSTANCES = new InjectionToken<
  (
    owner: string,
    repo: string,
    alertNumber: string,
    params?:
      | CodeScanningListAlertInstancesParams
      | (() => CodeScanningListAlertInstancesParams | undefined),
  ) => ReturnType<typeof httpResource<CodeScanningListAlertInstancesResponse>>
>('CODE_SCANNING_LIST_ALERT_INSTANCES');

export function provideCodeScanningListAlertInstances(): FactoryProvider {
  return {
    provide: CODE_SCANNING_LIST_ALERT_INSTANCES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        alertNumber: string,
        params?:
          | CodeScanningListAlertInstancesParams
          | (() => CodeScanningListAlertInstancesParams | undefined),
      ) =>
        httpResource<CodeScanningListAlertInstancesResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/code-scanning/alerts/${alertNumber}/instances`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
