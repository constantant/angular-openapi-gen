import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposListReleaseAssetsParams =
  paths['/repos/{owner}/{repo}/releases/{release_id}/assets']['get']['parameters']['query'];

type ReposListReleaseAssetsResponse =
  paths['/repos/{owner}/{repo}/releases/{release_id}/assets']['get']['responses']['200']['content']['application/json'];

export const REPOS_LIST_RELEASE_ASSETS = new InjectionToken<
  (
    owner: string,
    repo: string,
    release_id: string,
    params?: ReposListReleaseAssetsParams,
  ) => ReturnType<typeof httpResource<ReposListReleaseAssetsResponse>>
>('REPOS_LIST_RELEASE_ASSETS', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (
      owner: string,
      repo: string,
      release_id: string,
      params?: ReposListReleaseAssetsParams,
    ) =>
      httpResource<ReposListReleaseAssetsResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/releases/${release_id}/assets`,
        params: params as unknown as Record<
          string,
          string | number | boolean | readonly (string | number | boolean)[]
        >,
      }));
  },
});
