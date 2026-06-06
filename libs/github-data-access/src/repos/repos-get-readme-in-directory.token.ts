import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetReadmeInDirectoryParams =
  paths['/repos/{owner}/{repo}/readme/{dir}']['get']['parameters']['query'];

export type ReposGetReadmeInDirectoryResponse =
  paths['/repos/{owner}/{repo}/readme/{dir}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_README_IN_DIRECTORY = new InjectionToken<
  (
    owner: string,
    repo: string,
    dir: string,
    params?:
      | ReposGetReadmeInDirectoryParams
      | (() => ReposGetReadmeInDirectoryParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetReadmeInDirectoryResponse>>
>('REPOS_GET_README_IN_DIRECTORY');

export function provideReposGetReadmeInDirectory(): FactoryProvider {
  return {
    provide: REPOS_GET_README_IN_DIRECTORY,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        dir: string,
        params?:
          | ReposGetReadmeInDirectoryParams
          | (() => ReposGetReadmeInDirectoryParams | undefined),
      ) =>
        httpResource<ReposGetReadmeInDirectoryResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/readme/${dir}`,
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
