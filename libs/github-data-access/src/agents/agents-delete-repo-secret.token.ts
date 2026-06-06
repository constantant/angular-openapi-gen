import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const AGENTS_DELETE_REPO_SECRET = new InjectionToken<
  (
    owner: string,
    repo: string,
    secretName: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('AGENTS_DELETE_REPO_SECRET');

export function provideAgentsDeleteRepoSecret(): FactoryProvider {
  return {
    provide: AGENTS_DELETE_REPO_SECRET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, secretName: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/agents/secrets/${secretName}`,
          method: 'DELETE',
        }));
    },
  };
}
