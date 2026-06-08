import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecretScanningGetAlertParams =
  paths['/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}']['get']['parameters']['query'];

export type SecretScanningGetAlertResponse =
  paths['/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}']['get']['responses']['200']['content']['application/json'];

export const SECRET_SCANNING_GET_ALERT = new InjectionToken<
  (
    owner: string,
    repo: string,
    alertNumber: string,
    params?:
      | SecretScanningGetAlertParams
      | (() => SecretScanningGetAlertParams | undefined),
  ) => ReturnType<typeof httpResource<SecretScanningGetAlertResponse>>
>('SECRET_SCANNING_GET_ALERT');

export function provideSecretScanningGetAlert(): FactoryProvider {
  return {
    provide: SECRET_SCANNING_GET_ALERT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        alertNumber: string,
        params?:
          | SecretScanningGetAlertParams
          | (() => SecretScanningGetAlertParams | undefined),
      ) =>
        httpResource<SecretScanningGetAlertResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/secret-scanning/alerts/${alertNumber}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
