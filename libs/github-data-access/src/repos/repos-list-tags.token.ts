import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListTagsParams =
  paths['/repos/{owner}/{repo}/tags']['get']['parameters']['query'];

type ReposListTagsResponse =
  paths['/repos/{owner}/{repo}/tags']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_TAGS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListTagsParams,
  ) => ReturnType<typeof httpResource<ReposListTagsResponse>>
>('REPOS_LIST_TAGS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, params?: ReposListTagsParams) =>
      httpResource<ReposListTagsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/tags`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
