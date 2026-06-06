import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type SecretScanningListAlertsForRepoParams =
  paths['/repos/{owner}/{repo}/secret-scanning/alerts']['get']['parameters']['query'];

export type SecretScanningListAlertsForRepoResponse =
  paths['/repos/{owner}/{repo}/secret-scanning/alerts']['get']['responses']['200']['content']['application/json'];

export const SECRET_SCANNING_LIST_ALERTS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | SecretScanningListAlertsForRepoParams
      | (() => SecretScanningListAlertsForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<SecretScanningListAlertsForRepoResponse>>
>('SECRET_SCANNING_LIST_ALERTS_FOR_REPO', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | SecretScanningListAlertsForRepoParams
        | (() => SecretScanningListAlertsForRepoParams | undefined),
    ) =>
      httpResource<SecretScanningListAlertsForRepoResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/secret-scanning/alerts`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
