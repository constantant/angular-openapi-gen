import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ActionsListRepoSecretsParams =
  paths['/repos/{owner}/{repo}/actions/secrets']['get']['parameters']['query'];

export type ActionsListRepoSecretsResponse =
  paths['/repos/{owner}/{repo}/actions/secrets']['get']['responses']['200']['content']['application/json'];

export const ACTIONS_LIST_REPO_SECRETS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ActionsListRepoSecretsParams
      | (() => ActionsListRepoSecretsParams | undefined),
  ) => ReturnType<typeof httpResource<ActionsListRepoSecretsResponse>>
>('ACTIONS_LIST_REPO_SECRETS');

export function provideActionsListRepoSecrets(): FactoryProvider {
  return {
    provide: ACTIONS_LIST_REPO_SECRETS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ActionsListRepoSecretsParams
          | (() => ActionsListRepoSecretsParams | undefined),
      ) =>
        httpResource<ActionsListRepoSecretsResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/actions/secrets`,
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
