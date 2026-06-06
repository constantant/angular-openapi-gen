import { InjectionToken, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

type ReposGetReleaseAssetResponse =
  paths['/repos/{owner}/{repo}/releases/assets/{asset_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_RELEASE_ASSET = new InjectionToken<
  (
    owner: string,
    repo: string,
    asset_id: string,
  ) => ReturnType<typeof httpResource<ReposGetReleaseAssetResponse>>
>('REPOS_GET_RELEASE_ASSET', {
  providedIn: 'root',
  factory: () => {
    const base = inject(GITHUB_BASE_URL);
    return (owner: string, repo: string, asset_id: string) =>
      httpResource<ReposGetReleaseAssetResponse>(() => ({
        url: `${base}/repos/${owner}/${repo}/releases/assets/${asset_id}`,
      }));
  },
});
