import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_RELEASE_ASSET } from './repos-update-release-asset.token';
import type { ReposUpdateReleaseAssetResponse } from './repos-update-release-asset.token';

export function provideReposUpdateReleaseAssetMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateReleaseAssetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_RELEASE_ASSET,
    'REPOS_UPDATE_RELEASE_ASSET',
    initialBehavior,
  );
}
