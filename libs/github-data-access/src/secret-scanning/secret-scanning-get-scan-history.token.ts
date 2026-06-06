import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecretScanningGetScanHistoryResponse =
  paths['/repos/{owner}/{repo}/secret-scanning/scan-history']['get']['responses']['200']['content']['application/json'];

export const SECRET_SCANNING_GET_SCAN_HISTORY = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<SecretScanningGetScanHistoryResponse>>
>('SECRET_SCANNING_GET_SCAN_HISTORY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<SecretScanningGetScanHistoryResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/secret-scanning/scan-history`,
      }));
  },
});
