import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const CODESPACES_DELETE_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('CODESPACES_DELETE_REPO_SECRET');

export function provideCodespacesDeleteRepoSecret(): FactoryProvider {
  return {
    provide: CODESPACES_DELETE_REPO_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, secretName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/codespaces/secrets/${secretName}`,
          method: 'DELETE',
        }));
    },
  };
}
