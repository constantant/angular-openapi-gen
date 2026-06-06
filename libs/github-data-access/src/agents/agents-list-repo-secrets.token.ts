import { InjectionToken, inject } from '@angular/core';
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
>('AGENTS_LIST_REPO_SECRETS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?:
        | AgentsListRepoSecretsParams
        | (() => AgentsListRepoSecretsParams | undefined),
    ) =>
      httpResource<AgentsListRepoSecretsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/agents/secrets`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
