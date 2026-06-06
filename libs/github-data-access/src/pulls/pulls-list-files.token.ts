import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type PullsListFilesParams =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/files']['get']['parameters']['query'];

export type PullsListFilesResponse =
  paths['/repos/{owner}/{repo}/pulls/{pull_number}/files']['get']['responses']['200']['content']['application/json'];

export const PULLS_LIST_FILES = new InjectionToken<
  (
    owner: string,
    repo: string,
    pullNumber: string,
    params?: PullsListFilesParams | (() => PullsListFilesParams | undefined),
  ) => ReturnType<typeof httpResource<PullsListFilesResponse>>
>('PULLS_LIST_FILES', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      pullNumber: string,
      params?: PullsListFilesParams | (() => PullsListFilesParams | undefined),
    ) =>
      httpResource<PullsListFilesResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/pulls/${pullNumber}/files`,
        params: (typeof params === 'function'
          ? params()
          : params) as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
