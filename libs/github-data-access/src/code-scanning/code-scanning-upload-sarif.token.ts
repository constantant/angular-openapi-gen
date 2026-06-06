import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningUploadSarifBody = NonNullable<
  paths['/repos/{owner}/{repo}/code-scanning/sarifs']['post']['requestBody']
>['content']['application/json'];

export const CODE_SCANNING_UPLOAD_SARIF = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: CodeScanningUploadSarifBody | Signal<CodeScanningUploadSarifBody>,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODE_SCANNING_UPLOAD_SARIF', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body: CodeScanningUploadSarifBody | Signal<CodeScanningUploadSarifBody>,
    ) =>
      httpResource<unknown>(() => ({
        url: `${base}/repos/${owner}/${repo}/code-scanning/sarifs`,
        method: 'POST',
        body,
      }));
  },
});
