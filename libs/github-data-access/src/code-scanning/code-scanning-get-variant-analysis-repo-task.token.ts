import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningGetVariantAnalysisRepoTaskResponse =
  paths['/repos/{owner}/{repo}/code-scanning/codeql/variant-analyses/{codeql_variant_analysis_id}/repos/{repo_owner}/{repo_name}']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_GET_VARIANT_ANALYSIS_REPO_TASK = new InjectionToken<
  (
    owner: string,
    repo: string,
    codeqlVariantAnalysisId: string,
    repoOwner: string,
    repoName: string,
  ) => ReturnType<
    typeof httpResource<CodeScanningGetVariantAnalysisRepoTaskResponse>
  >
>('CODE_SCANNING_GET_VARIANT_ANALYSIS_REPO_TASK');

export function provideCodeScanningGetVariantAnalysisRepoTask(): FactoryProvider {
  return {
    provide: CODE_SCANNING_GET_VARIANT_ANALYSIS_REPO_TASK,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        codeqlVariantAnalysisId: string,
        repoOwner: string,
        repoName: string,
      ) =>
        httpResource<CodeScanningGetVariantAnalysisRepoTaskResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-scanning/codeql/variant-analyses/${codeqlVariantAnalysisId}/repos/${repoOwner}/${repoName}`,
        }));
    },
  };
}
