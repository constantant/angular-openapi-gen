import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCommitParams =
  paths['/repos/{owner}/{repo}/commits/{ref}']['get']['parameters']['query'];

export type ReposGetCommitResponse =
  paths['/repos/{owner}/{repo}/commits/{ref}']['get']['responses']['200']['content']['application/json'];

export type ReposGetCommitError =
  | paths['/repos/{owner}/{repo}/commits/{ref}']['get']['responses']['404']['content']['application/json']
  | paths['/repos/{owner}/{repo}/commits/{ref}']['get']['responses']['409']['content']['application/json']
  | paths['/repos/{owner}/{repo}/commits/{ref}']['get']['responses']['422']['content']['application/json']
  | paths['/repos/{owner}/{repo}/commits/{ref}']['get']['responses']['500']['content']['application/json']
  | paths['/repos/{owner}/{repo}/commits/{ref}']['get']['responses']['503']['content']['application/json'];

export const REPOS_GET_COMMIT = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
    params?: ReposGetCommitParams | (() => ReposGetCommitParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetCommitResponse>>
>('REPOS_GET_COMMIT');

export function provideReposGetCommit(): FactoryProvider {
  return {
    provide: REPOS_GET_COMMIT,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        ref: string,
        params?:
          | ReposGetCommitParams
          | (() => ReposGetCommitParams | undefined),
      ) =>
        httpResource<ReposGetCommitResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/commits/${ref}`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
