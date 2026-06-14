import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecretScanningListLocationsForAlertParams =
  paths['/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations']['get']['parameters']['query'];

export type SecretScanningListLocationsForAlertResponse =
  paths['/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations']['get']['responses']['200']['content']['application/json'];

export const SECRET_SCANNING_LIST_LOCATIONS_FOR_ALERT = new InjectionToken<
  (
    owner: string,
    repo: string,
    alertNumber: string,
    params?:
      | SecretScanningListLocationsForAlertParams
      | (() => SecretScanningListLocationsForAlertParams | undefined),
  ) => ReturnType<
    typeof httpResource<SecretScanningListLocationsForAlertResponse>
  >
>('SECRET_SCANNING_LIST_LOCATIONS_FOR_ALERT');

export function provideSecretScanningListLocationsForAlert(): FactoryProvider {
  return {
    provide: SECRET_SCANNING_LIST_LOCATIONS_FOR_ALERT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        alertNumber: string,
        params?:
          | SecretScanningListLocationsForAlertParams
          | (() => SecretScanningListLocationsForAlertParams | undefined),
      ) =>
        httpResource<SecretScanningListLocationsForAlertResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/secret-scanning/alerts/${alertNumber}/locations`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
