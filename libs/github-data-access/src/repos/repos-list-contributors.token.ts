import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListContributorsParams =
  paths['/repos/{owner}/{repo}/contributors']['get']['parameters']['query'];

type ReposListContributorsResponse =
  paths['/repos/{owner}/{repo}/contributors']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_CONTRIBUTORS = new InjectionToken<
  (
    owner: string,
    repo: string,
    params?: ReposListContributorsParams,
  ) => ReturnType<typeof httpResource<ReposListContributorsResponse>>
>('REPOS_LIST_CONTRIBUTORS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      params?: ReposListContributorsParams,
    ) =>
      httpResource<ReposListContributorsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/contributors`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
