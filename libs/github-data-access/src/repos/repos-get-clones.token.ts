import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetClonesParams =
  paths['/repos/{owner}/{repo}/traffic/clones']['get']['parameters']['query'];

export type ReposGetClonesResponse =
  paths['/repos/{owner}/{repo}/traffic/clones']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_CLONES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposGetClonesParams | (() => ReposGetClonesParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetClonesResponse>>
>('REPOS_GET_CLONES');

export function provideReposGetClones(): FactoryProvider {
  return {
    provide: REPOS_GET_CLONES,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposGetClonesParams
          | (() => ReposGetClonesParams | undefined),
      ) =>
        httpResource<ReposGetClonesResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/traffic/clones`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
