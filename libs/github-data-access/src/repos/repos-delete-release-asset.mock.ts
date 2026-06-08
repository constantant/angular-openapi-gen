import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_RELEASE_ASSET } from './repos-delete-release-asset.token';

export function provideReposDeleteReleaseAssetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_RELEASE_ASSET,
    'REPOS_DELETE_RELEASE_ASSET',
    initialBehavior,
  );
}
