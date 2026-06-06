import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningUpdateAlertBody = NonNullable<
  paths['/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}']['patch']['requestBody']
>['content']['application/json'];

export type CodeScanningUpdateAlertResponse =
  paths['/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}']['patch']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_UPDATE_ALERT = new InjectionToken<
  (
    owner: string,
    repo: string,
    alertNumber: string,
    body: CodeScanningUpdateAlertBody | Signal<CodeScanningUpdateAlertBody>,
  ) => ReturnType<typeof httpResource<CodeScanningUpdateAlertResponse>>
>('CODE_SCANNING_UPDATE_ALERT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      alertNumber: string,
      body: CodeScanningUpdateAlertBody | Signal<CodeScanningUpdateAlertBody>,
    ) =>
      httpResource<CodeScanningUpdateAlertResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/code-scanning/alerts/${alertNumber}`,
        method: 'PATCH',
        body,
      }));
  },
});
