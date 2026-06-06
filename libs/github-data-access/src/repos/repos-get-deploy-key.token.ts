import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetDeployKeyResponse =
  paths['/repos/{owner}/{repo}/keys/{key_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_DEPLOY_KEY = new InjectionToken<
  (
    owner: string,
    repo: string,
    keyId: string,
  ) => ReturnType<typeof httpResource<ReposGetDeployKeyResponse>>
>('REPOS_GET_DEPLOY_KEY');

export function provideReposGetDeployKey(): FactoryProvider {
  return {
    provide: REPOS_GET_DEPLOY_KEY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, keyId: string) =>
        httpResource<ReposGetDeployKeyResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/keys/${keyId}`,
        }));
    },
  };
}
