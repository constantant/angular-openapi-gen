import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeQualityGetSetupResponse =
  paths['/repos/{owner}/{repo}/code-quality/setup']['get']['responses']['200']['content']['application/json'];

export const CODE_QUALITY_GET_SETUP = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<CodeQualityGetSetupResponse>>
>('CODE_QUALITY_GET_SETUP', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string) =>
      httpResource<CodeQualityGetSetupResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/code-quality/setup`,
      }));
  },
});
