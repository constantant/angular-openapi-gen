import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningListRecentAnalysesParams =
  paths['/repos/{owner}/{repo}/code-scanning/analyses']['get']['parameters']['query'];

export type CodeScanningListRecentAnalysesResponse =
  paths['/repos/{owner}/{repo}/code-scanning/analyses']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_LIST_RECENT_ANALYSES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | CodeScanningListRecentAnalysesParams
      | (() => CodeScanningListRecentAnalysesParams | undefined),
  ) => ReturnType<typeof httpResource<CodeScanningListRecentAnalysesResponse>>
>('CODE_SCANNING_LIST_RECENT_ANALYSES');

export function provideCodeScanningListRecentAnalyses(): FactoryProvider {
  return {
    provide: CODE_SCANNING_LIST_RECENT_ANALYSES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | CodeScanningListRecentAnalysesParams
          | (() => CodeScanningListRecentAnalysesParams | undefined),
      ) =>
        httpResource<CodeScanningListRecentAnalysesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-scanning/analyses`,
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
