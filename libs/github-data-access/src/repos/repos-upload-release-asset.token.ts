import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export type ReposUploadReleaseAssetBody = NonNullable<
  paths['/repos/{owner}/{repo}/releases/{release_id}/assets']['post']['requestBody']
>['content']['application/octet-stream'];

export type ReposUploadReleaseAssetResponse =
  paths['/repos/{owner}/{repo}/releases/{release_id}/assets']['post']['responses']['201']['content']['application/json'];

export const REPOS_UPLOAD_RELEASE_ASSET = new InjectionToken<
  (
    owner: string,
    repo: string,
    releaseId: string,
    body: ReposUploadReleaseAssetBody | Signal<ReposUploadReleaseAssetBody>,
  ) => ReturnType<typeof httpResource<ReposUploadReleaseAssetResponse>>
>('REPOS_UPLOAD_RELEASE_ASSET');

export function provideReposUploadReleaseAsset(): FactoryProvider {
  return {
    provide: REPOS_UPLOAD_RELEASE_ASSET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (
        owner: string,
        repo: string,
        releaseId: string,
        body: ReposUploadReleaseAssetBody | Signal<ReposUploadReleaseAssetBody>,
      ) =>
        httpResource<ReposUploadReleaseAssetResponse>(() => ({
          url: `${base}/repos/${owner}/${repo}/releases/${releaseId}/assets`,
          method: 'POST',
          body,
        }));
    },
  };
}
