import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const CODE_SCANNING_DELETE_CODEQL_DATABASE = new InjectionToken<
  (
    owner: string,
    repo: string,
    language: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODE_SCANNING_DELETE_CODEQL_DATABASE');

export function provideCodeScanningDeleteCodeqlDatabase(): FactoryProvider {
  return {
    provide: CODE_SCANNING_DELETE_CODEQL_DATABASE,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, language: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/code-scanning/codeql/databases/${language}`,
          method: 'DELETE',
        }));
    },
  };
}
