import { InjectionToken, inject, Signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningUpdateDefaultSetupBody = NonNullable<
  paths['/repos/{owner}/{repo}/code-scanning/default-setup']['patch']['requestBody']
>['content']['application/json'];

export type CodeScanningUpdateDefaultSetupResponse =
  paths['/repos/{owner}/{repo}/code-scanning/default-setup']['patch']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_UPDATE_DEFAULT_SETUP = new InjectionToken<
  (
    owner: string,
    repo: string,
    body:
      | CodeScanningUpdateDefaultSetupBody
      | Signal<CodeScanningUpdateDefaultSetupBody>,
  ) => ReturnType<typeof httpResource<CodeScanningUpdateDefaultSetupResponse>>
>('CODE_SCANNING_UPDATE_DEFAULT_SETUP', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      body:
        | CodeScanningUpdateDefaultSetupBody
        | Signal<CodeScanningUpdateDefaultSetupBody>,
    ) =>
      httpResource<CodeScanningUpdateDefaultSetupResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/code-scanning/default-setup`,
        method: 'PATCH',
        body,
      }));
  },
});
