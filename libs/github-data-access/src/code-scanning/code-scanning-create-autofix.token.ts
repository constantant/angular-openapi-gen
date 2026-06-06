import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningCreateAutofixResponse =
  paths['/repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/autofix']['post']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_CREATE_AUTOFIX = new InjectionToken<
  (
    owner: string,
    repo: string,
    alertNumber: string,
  ) => ReturnType<typeof httpResource<CodeScanningCreateAutofixResponse>>
>('CODE_SCANNING_CREATE_AUTOFIX');

export function provideCodeScanningCreateAutofix(): FactoryProvider {
  return {
    provide: CODE_SCANNING_CREATE_AUTOFIX,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, alertNumber: string) =>
        httpResource<CodeScanningCreateAutofixResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-scanning/alerts/${alertNumber}/autofix`,
          method: 'POST',
        }));
    },
  };
}
