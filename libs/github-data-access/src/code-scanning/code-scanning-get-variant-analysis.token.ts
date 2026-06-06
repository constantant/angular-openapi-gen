import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningGetVariantAnalysisResponse =
  paths['/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_GET_VARIANT_ANALYSIS = new InjectionToken<
  (
    owner: string,
    repo: string,
    codeqlVariantAnalysisId: string,
  ) => ReturnType<typeof httpResource<CodeScanningGetVariantAnalysisResponse>>
>('CODE_SCANNING_GET_VARIANT_ANALYSIS');

export function provideCodeScanningGetVariantAnalysis(): FactoryProvider {
  return {
    provide: CODE_SCANNING_GET_VARIANT_ANALYSIS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, codeqlVariantAnalysisId: string) =>
        httpResource<CodeScanningGetVariantAnalysisResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-scanning/codeql/variant-analyses/${codeqlVariantAnalysisId}`,
        }));
    },
  };
}
