import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposGetReleaseAssetResponse =
  paths['/repos/{owner}/{repo}/releases/assets/{asset_id}']['get']['responses']['200']['content']['application/json'];

export const REPOS_GET_RELEASE_ASSET = new InjectionToken<
  (
    owner: string,
    repo: string,
    assetId: string,
  ) => ReturnType<typeof httpResource<ReposGetReleaseAssetResponse>>
>('REPOS_GET_RELEASE_ASSET');

export function provideReposGetReleaseAsset(): FactoryProvider {
  return {
    provide: REPOS_GET_RELEASE_ASSET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, assetId: string) =>
        httpResource<ReposGetReleaseAssetResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/releases/assets/${assetId}`,
        }));
    },
  };
}
