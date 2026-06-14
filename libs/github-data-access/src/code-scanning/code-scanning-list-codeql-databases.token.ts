import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodeScanningListCodeqlDatabasesResponse =
  paths['/repos/{owner}/{repo}/code-scanning/codeql/databases']['get']['responses']['200']['content']['application/json'];

export const CODE_SCANNING_LIST_CODEQL_DATABASES = new InjectionToken<
  (
    owner: string,
    repo: string,
  ) => ReturnType<typeof httpResource<CodeScanningListCodeqlDatabasesResponse>>
>('CODE_SCANNING_LIST_CODEQL_DATABASES');

export function provideCodeScanningListCodeqlDatabases(): FactoryProvider {
  return {
    provide: CODE_SCANNING_LIST_CODEQL_DATABASES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string) =>
        httpResource<CodeScanningListCodeqlDatabasesResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-scanning/codeql/databases`,
        }));
    },
  };
}
