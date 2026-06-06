import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningGetSarifResponse =
  paths['/repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_GET_SARIF = new InjectionToken<
  (
    owner: string,
    repo: string,
    sarifId: string,
  ) => ReturnType<typeof httpResource<CodeScanningGetSarifResponse>>
>('CODE_SCANNING_GET_SARIF', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, sarifId: string) =>
      httpResource<CodeScanningGetSarifResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/code-scanning/sarifs/${sarifId}`,
      }));
  },
});
