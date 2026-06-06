import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningCommitAutofixBody = NonNullable<
  paths['/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix/commits']['post']['requestBody']
>['content']['application/json'];

export type CodeScanningCommitAutofixResponse =
  paths['/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix/commits']['post']['responses']['201']['content']['application/json'];

export const CODE_SCANNING_COMMIT_AUTOFIX = new InjectionToken<
  (
    owner: string,
    repo: string,
    alertNumber: string,
    body: CodeScanningCommitAutofixBody | Signal<CodeScanningCommitAutofixBody>,
  ) => ReturnType<typeof httpResource<CodeScanningCommitAutofixResponse>>
>('CODE_SCANNING_COMMIT_AUTOFIX', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      alertNumber: string,
      body:
        | CodeScanningCommitAutofixBody
        | Signal<CodeScanningCommitAutofixBody>,
    ) =>
      httpResource<CodeScanningCommitAutofixResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/code-scanning/alerts/${alertNumber}/autofix/commits`,
        method: 'POST',
        body,
      }));
  },
});
