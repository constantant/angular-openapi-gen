import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningGetDefaultSetupResponse =
  paths['/repos/{owner}/{repo}/code-scanning/default-setup']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_GET_DEFAULT_SETUP = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<CodeScanningGetDefaultSetupResponse>>
>('CODE_SCANNING_GET_DEFAULT_SETUP', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<CodeScanningGetDefaultSetupResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/code-scanning/default-setup`,
      }));
  },
});
