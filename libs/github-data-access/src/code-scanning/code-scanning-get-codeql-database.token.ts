import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningGetCodeqlDatabaseResponse =
  paths['/repos/{owner}/{repo}/code-scanning/codeql/databases/{language}']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_GET_CODEQL_DATABASE = new InjectionToken<
  (
    owner: string,
    repo: string,
    language: string,
  ) => ReturnType<typeof httpResource<CodeScanningGetCodeqlDatabaseResponse>>
>('CODE_SCANNING_GET_CODEQL_DATABASE');

export function provideCodeScanningGetCodeqlDatabase(): FactoryProvider {
  return {
    provide: CODE_SCANNING_GET_CODEQL_DATABASE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, language: string) =>
        httpResource<CodeScanningGetCodeqlDatabaseResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-scanning/codeql/databases/${language}`,
        }));
    },
  };
}
