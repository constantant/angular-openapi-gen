import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeQualityUpdateSetupBody = NonNullable<
  paths['/repos/{owner}/{repo}/code-quality/setup']['patch']['requestBody']
>['content']['application/json'];

export type CodeQualityUpdateSetupResponse =
  paths['/repos/{owner}/{repo}/code-quality/setup']['patch']['responses']['200']['content']['application/json'];

export const CODE_QUALITY_UPDATE_SETUP = new InjectionToken<
  (
    owner: string,
    repo: string,
    body: CodeQualityUpdateSetupBody | Signal<CodeQualityUpdateSetupBody>,
  ) => ReturnType<typeof httpResource<CodeQualityUpdateSetupResponse>>
>('CODE_QUALITY_UPDATE_SETUP');

export function provideCodeQualityUpdateSetup(): FactoryProvider {
  return {
    provide: CODE_QUALITY_UPDATE_SETUP,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        body: CodeQualityUpdateSetupBody | Signal<CodeQualityUpdateSetupBody>,
      ) =>
        httpResource<CodeQualityUpdateSetupResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-quality/setup`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
