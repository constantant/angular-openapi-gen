import { InjectionToken, inject, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { paths } from '../schema.d';
import { GITHUB_BASE_URL } from '../api-base-url.token';

export const REPOS_DELETE_RELEASE_ASSET = new InjectionToken<
  (
    owner: string,
    repo: string,
    assetId: string,
  ) => ReturnType<typeof httpResource<unknown>>
>('REPOS_DELETE_RELEASE_ASSET');

export function provideReposDeleteReleaseAsset(): FactoryProvider {
  return {
    provide: REPOS_DELETE_RELEASE_ASSET,
    useFactory: () => {
      const base = inject(GITHUB_BASE_URL);
      return (owner: string, repo: string, assetId: string) =>
        httpResource<unknown>(() => ({
          url: `${base}/repos/${owner}/${repo}/releases/assets/${assetId}`,
          method: 'DELETE',
        }));
    },
  };
}
