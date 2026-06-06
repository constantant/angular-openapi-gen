import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningCreateVariantAnalysisBody = NonNullable<
  paths['/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses']['post']['requestBody']
>['content']['application/json'];

export type CodeScanningCreateVariantAnalysisResponse =
  paths['/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses']['post']['responses']['201']['content']['application/json'];

export const CODE_SCANNING_CREATE_VARIANT_ANALYSIS = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | CodeScanningCreateVariantAnalysisBody
      | Signal<CodeScanningCreateVariantAnalysisBody>,
  ) => ReturnType<
    typeof httpResource<CodeScanningCreateVariantAnalysisResponse>
  >
>('CODE_SCANNING_CREATE_VARIANT_ANALYSIS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body:
        | CodeScanningCreateVariantAnalysisBody
        | Signal<CodeScanningCreateVariantAnalysisBody>,
    ) =>
      httpResource<CodeScanningCreateVariantAnalysisResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/code-scanning/codeql/variant-analyses`,
        method: 'POST',
        body,
      }));
  },
});
