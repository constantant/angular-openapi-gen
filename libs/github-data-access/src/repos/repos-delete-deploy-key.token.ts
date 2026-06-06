import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_DEPLOY_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
    keyId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_DEPLOY_KEY');

export function provideReposDeleteDeployKey(): FactoryProvider {
  return {
    provide: REPOS_DELETE_DEPLOY_KEY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, keyId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/keys/${keyId}`,
          method: 'DELETE',
        }));
    },
  };
}
