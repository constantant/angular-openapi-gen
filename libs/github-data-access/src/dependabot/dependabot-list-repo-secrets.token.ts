import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type DependabotListRepoSecretsParams =
  paths['/repos/{owner}/{repo}/dependabot/secrets']['get']['parameters']['query'];

export type DependabotListRepoSecretsResponse =
  paths['/repos/{owner}/{repo}/dependabot/secrets']['get']['responses']['200']['content']['application/json'];

export const DEPENDABOT_LIST_REPO_SECRETS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | DependabotListRepoSecretsParams
      | (() => DependabotListRepoSecretsParams | undefined),
  ) => ReturnType<typeof httpResource<DependabotListRepoSecretsResponse>>
>('DEPENDABOT_LIST_REPO_SECRETS');

export function provideDependabotListRepoSecrets(): FactoryProvider {
  return {
    provide: DEPENDABOT_LIST_REPO_SECRETS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | DependabotListRepoSecretsParams
          | (() => DependabotListRepoSecretsParams | undefined),
      ) =>
        httpResource<DependabotListRepoSecretsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/dependabot/secrets`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
