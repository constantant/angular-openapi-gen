import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningDeleteAnalysisResponse =
  paths['/repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}']['delete']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_DELETE_ANALYSIS = new InjectionToken<
  (
    owner: string,
    repo: string,
    analysisId: string,
  ) => ReturnType<typeof httpResource<CodeScanningDeleteAnalysisResponse>>
>('CODE_SCANNING_DELETE_ANALYSIS');

export function provideCodeScanningDeleteAnalysis(): FactoryProvider {
  return {
    provide: CODE_SCANNING_DELETE_ANALYSIS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, analysisId: string) =>
        httpResource<CodeScanningDeleteAnalysisResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-scanning/analyses/${analysisId}`,
          method: 'DELETE',
        }));
    },
  };
}
