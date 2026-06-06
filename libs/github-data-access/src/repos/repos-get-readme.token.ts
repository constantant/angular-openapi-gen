import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetReadmeParams =
  paths['/repos/{owner}/{repo}/readme']['get']['parameters']['query'];

type ReposGetReadmeResponse =
  paths['/repos/{owner}/{repo}/readme']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_README = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposGetReadmeParams,
  ) => ReturnType<typeof httpResource<ReposGetReadmeResponse>>
>('REPOS_GET_README', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, params?: ReposGetReadmeParams) =>
      httpResource<ReposGetReadmeResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/readme`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
