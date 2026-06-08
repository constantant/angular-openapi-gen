import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposListCollaboratorsParams =
  paths['/repos/{owner}/{repo}/collaborators']['get']['parameters']['query'];

export type ReposListCollaboratorsResponse =
  paths['/repos/{owner}/{repo}/collaborators']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_COLLABORATORS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?:
      | ReposListCollaboratorsParams
      | (() => ReposListCollaboratorsParams | undefined),
  ) => ReturnType<typeof httpResource<ReposListCollaboratorsResponse>>
>('REPOS_LIST_COLLABORATORS');

export function provideReposListCollaborators(): FactoryProvider {
  return {
    provide: REPOS_LIST_COLLABORATORS,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        params?:
          | ReposListCollaboratorsParams
          | (() => ReposListCollaboratorsParams | undefined),
      ) =>
        httpResource<ReposListCollaboratorsResponse>(() => {
          const _params = typeof params === 'function' ? params() : params;
          if (typeof params === 'function' && _params === undefined)
            return undefined;
          return {
            url: `${base}/repos/${owner}/${repo}/collaborators`,
            params: _params as unknown as Record<
              string,
              string | number | boolean | readonly (string | number | boolean)[]
            >,
          };
        });
    },
  };
}
