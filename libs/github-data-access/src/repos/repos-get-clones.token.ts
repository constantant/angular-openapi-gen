import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetClonesParams =
  paths['/repos/{owner}/{repo}/traffic/clones']['get']['parameters']['query'];

type ReposGetClonesResponse =
  paths['/repos/{owner}/{repo}/traffic/clones']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_CLONES = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposGetClonesParams,
  ) => ReturnType<typeof httpResource<ReposGetClonesResponse>>
>('REPOS_GET_CLONES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, params?: ReposGetClonesParams) =>
      httpResource<ReposGetClonesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/traffic/clones`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
