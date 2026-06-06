import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUpdateReleaseAssetBody = NonNullable<
  paths['/repos/{owner}/{repo}/releases/assets/{asset_id}']['patch']['requestBody']
>['content']['application/json'];

export type ReposUpdateReleaseAssetResponse =
  paths['/repos/{owner}/{repo}/releases/assets/{asset_id}']['patch']['responses']['200']['content']['application/json'];

export const REPOS_UPDATE_RELEASE_ASSET = new InjectionToken<
  (
    owner: string,
    repo: string,
    assetId: string,
    body: ReposUpdateReleaseAssetBody | Signal<ReposUpdateReleaseAssetBody>,
  ) => ReturnType<typeof httpResource<ReposUpdateReleaseAssetResponse>>
>('REPOS_UPDATE_RELEASE_ASSET');

export function provideReposUpdateReleaseAsset(): FactoryProvider {
  return {
    provide: REPOS_UPDATE_RELEASE_ASSET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        assetId: string,
        body: ReposUpdateReleaseAssetBody | Signal<ReposUpdateReleaseAssetBody>,
      ) =>
        httpResource<ReposUpdateReleaseAssetResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/releases/assets/${assetId}`,
          method: 'PATCH',
          body,
        }));
    },
  };
}
