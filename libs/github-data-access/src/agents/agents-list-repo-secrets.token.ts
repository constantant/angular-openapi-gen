import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type AgentsListRepoSecretsParams =
  paths['/repos/{owner}/{repo}/agents/secrets']['get']['parameters']['query'];

export type AgentsListRepoSecretsResponse =
  paths['/repos/{owner}/{repo}/agents/secrets']['get']['responses']['200']['content']['application/json'];

export const AGENTS_LIST_REPO_SECRETS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | AgentsListRepoSecretsParams
      | (() => AgentsListRepoSecretsParams | undefined),
  ) => ReturnType<typeof httpResource<AgentsListRepoSecretsResponse>>
>('AGENTS_LIST_REPO_SECRETS');

export function provideAgentsListRepoSecrets(): FactoryProvider {
  return {
    provide: AGENTS_LIST_REPO_SECRETS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | AgentsListRepoSecretsParams
          | (() => AgentsListRepoSecretsParams | undefined),
      ) =>
        httpResource<AgentsListRepoSecretsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/agents/secrets`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
