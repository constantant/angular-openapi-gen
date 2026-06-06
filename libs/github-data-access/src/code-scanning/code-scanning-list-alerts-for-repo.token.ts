import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningListAlertsForRepoParams =
  paths['/repos/{owner}/{repo}/code-scanning/alerts']['get']['parameters']['query'];

export type CodeScanningListAlertsForRepoResponse =
  paths['/repos/{owner}/{repo}/code-scanning/alerts']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_LIST_ALERTS_FOR_REPO = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | CodeScanningListAlertsForRepoParams
      | (() => CodeScanningListAlertsForRepoParams | undefined),
  ) => ReturnType<typeof httpResource<CodeScanningListAlertsForRepoResponse>>
>('CODE_SCANNING_LIST_ALERTS_FOR_REPO');

export function provideCodeScanningListAlertsForRepo(): FactoryProvider {
  return {
    provide: CODE_SCANNING_LIST_ALERTS_FOR_REPO,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | CodeScanningListAlertsForRepoParams
          | (() => CodeScanningListAlertsForRepoParams | undefined),
      ) =>
        httpResource<CodeScanningListAlertsForRepoResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-scanning/alerts`,
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
