import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListTeamsParams =
  paths['/repos/{owner}/{repo}/teams']['get']['parameters']['query'];

export type ReposListTeamsResponse =
  paths['/repos/{owner}/{repo}/teams']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_TEAMS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListTeamsParams | (() => ReposListTeamsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListTeamsResponse>>
>('REPOS_LIST_TEAMS');

export function provideReposListTeams(): FactoryProvider {
  return {
    provide: REPOS_LIST_TEAMS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListTeamsParams
          | (() => ReposListTeamsParams | undefined),
      ) =>
        httpResource<ReposListTeamsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/teams`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
