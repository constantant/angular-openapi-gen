import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_GET_RELEASE_ASSET } from './repos-get-release-asset.token';
import type { ReposGetReleaseAssetResponse } from './repos-get-release-asset.token';

export function provideReposGetReleaseAssetMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetReleaseAssetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_RELEASE_ASSET,
    'REPOS_GET_RELEASE_ASSET',
    initialBehavior,
  );
}
