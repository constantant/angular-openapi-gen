import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningGetAutofixResponse =
  paths['/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_GET_AUTOFIX = new InjectionToken<
  (
    owner: string,
    repo: string,
    alertNumber: string,
  ) => ReturnType<typeof httpResource<CodeScanningGetAutofixResponse>>
>('CODE_SCANNING_GET_AUTOFIX', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, alertNumber: string) =>
      httpResource<CodeScanningGetAutofixResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/code-scanning/alerts/${alertNumber}/autofix`,
      }));
  },
});
