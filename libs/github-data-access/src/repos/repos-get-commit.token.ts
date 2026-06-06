import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetCommitParams =
  paths['/repos/{owner}/{repo}/commits/{ref}']['get']['parameters']['query'];

export type ReposGetCommitResponse =
  paths['/repos/{owner}/{repo}/commits/{ref}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_COMMIT = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
    params?: ReposGetCommitParams | (() => ReposGetCommitParams | undefined),
  ) => ReturnType<typeof httpResource<ReposGetCommitResponse>>
>('REPOS_GET_COMMIT', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      ref: string,
      params?: ReposGetCommitParams | (() => ReposGetCommitParams | undefined),
    ) =>
      httpResource<ReposGetCommitResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/commits/${ref}`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
