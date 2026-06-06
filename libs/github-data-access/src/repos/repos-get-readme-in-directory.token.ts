import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetReadmeInDirectoryParams =
  paths['/repos/{owner}/{repo}/readme/{dir}']['get']['parameters']['query'];

type ReposGetReadmeInDirectoryResponse =
  paths['/repos/{owner}/{repo}/readme/{dir}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_README_IN_DIRECTORY = new InjectionToken<
  (
    owner: string,
    repo: string,
    dir: string,
    params?: ReposGetReadmeInDirectoryParams,
  ) => ReturnType<typeof httpResource<ReposGetReadmeInDirectoryResponse>>
>('REPOS_GET_README_IN_DIRECTORY', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      dir: string,
      params?: ReposGetReadmeInDirectoryParams,
    ) =>
      httpResource<ReposGetReadmeInDirectoryResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/readme/${dir}`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
