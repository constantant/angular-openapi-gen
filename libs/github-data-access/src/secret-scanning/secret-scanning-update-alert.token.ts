import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecretScanningUpdateAlertBody = NonNullable<
  paths['/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}']['patch']['requestBody']
>['content']['application/json'];

export type SecretScanningUpdateAlertResponse =
  paths['/repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}']['patch']['responses']['200']['content']['application/json'];

export const SECRET_SCANNING_UPDATE_ALERT = new InjectionToken<
  (
    owner: string,
    repo: string,
    alertNumber: string,
    body: SecretScanningUpdateAlertBody | Signal<SecretScanningUpdateAlertBody>,
  ) => ReturnType<typeof httpResource<SecretScanningUpdateAlertResponse>>
>('SECRET_SCANNING_UPDATE_ALERT');

export function provideSecretScanningUpdateAlert(): FactoryProvider {
  return {
    provide: SECRET_SCANNING_UPDATE_ALERT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        alertNumber: string,
        body:
          | SecretScanningUpdateAlertBody
          | Signal<SecretScanningUpdateAlertBody>,
      ) =>
        httpResource<SecretScanningUpdateAlertResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/secret-scanning/alerts/${alertNumber}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
