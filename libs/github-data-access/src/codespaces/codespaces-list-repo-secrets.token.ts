import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type CodespacesListRepoSecretsParams =
  paths['/repos/{owner}/{repo}/codespaces/secrets']['get']['parameters']['query'];

export type CodespacesListRepoSecretsResponse =
  paths['/repos/{owner}/{repo}/codespaces/secrets']['get']['responses']['200']['content']['application/json'];

export const CODESPACES_LIST_REPO_SECRETS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | CodespacesListRepoSecretsParams
      | (() => CodespacesListRepoSecretsParams | undefined),
  ) => ReturnType<typeof httpResource<CodespacesListRepoSecretsResponse>>
>('CODESPACES_LIST_REPO_SECRETS');

export function provideCodespacesListRepoSecrets(): FactoryProvider {
  return {
    provide: CODESPACES_LIST_REPO_SECRETS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | CodespacesListRepoSecretsParams
          | (() => CodespacesListRepoSecretsParams | undefined),
      ) =>
        httpResource<CodespacesListRepoSecretsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/codespaces/secrets`,
          params: (typeof params === 'function'
            ? params()
            : params) as unknown as Record<
            string,
            string | number | boolean | readonly (string | number | boolean)[]
          >,
        }));
    },
  };
}
