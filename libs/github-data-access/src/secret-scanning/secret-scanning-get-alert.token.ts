import { InjectionToken, inject } from '@angular/core';
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
>('SECRET_SCANNING_GET_ALERT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      alertNumber: string,
      params?:
        | SecretScanningGetAlertParams
        | (() => SecretScanningGetAlertParams | undefined),
    ) =>
      httpResource<SecretScanningGetAlertResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/secret-scanning/alerts/${alertNumber}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
