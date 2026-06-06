import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetCombinedStatusForRefParams =
  paths['/repos/{owner}/{repo}/commits/{ref}/status']['get']['parameters']['query'];

type ReposGetCombinedStatusForRefResponse =
  paths['/repos/{owner}/{repo}/commits/{ref}/status']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_COMBINED_STATUS_FOR_REF = new InjectionToken<
  (
    owner: string,
    repo: string,
    ref: string,
    params?: ReposGetCombinedStatusForRefParams,
  ) => ReturnType<typeof httpResource<ReposGetCombinedStatusForRefResponse>>
>('REPOS_GET_COMBINED_STATUS_FOR_REF', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      ref: string,
      params?: ReposGetCombinedStatusForRefParams,
    ) =>
      httpResource<ReposGetCombinedStatusForRefResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/commits/${ref}/status`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
