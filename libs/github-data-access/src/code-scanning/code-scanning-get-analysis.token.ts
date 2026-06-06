import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningGetAnalysisResponse =
  paths['/repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_GET_ANALYSIS = new InjectionToken<
  (
    owner: string,
    repo: string,
    analysisId: string,
  ) => ReturnType<typeof httpResource<CodeScanningGetAnalysisResponse>>
>('CODE_SCANNING_GET_ANALYSIS');

export function provideCodeScanningGetAnalysis(): FactoryProvider {
  return {
    provide: CODE_SCANNING_GET_ANALYSIS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, analysisId: string) =>
        httpResource<CodeScanningGetAnalysisResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-scanning/analyses/${analysisId}`,
        }));
    },
  };
}
