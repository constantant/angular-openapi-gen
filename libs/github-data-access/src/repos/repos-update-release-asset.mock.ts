import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_RELEASE_ASSET } from './repos-update-release-asset.token';
import type { ReposUpdateReleaseAssetResponse } from './repos-update-release-asset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-release-asset',
  path: '/repos/{owner}/{repo}/releases/assets/{asset_id}',
  method: 'patch',
  tag: 'repos',
};

export function provideReposUpdateReleaseAssetMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateReleaseAssetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_RELEASE_ASSET,
    'REPOS_UPDATE_RELEASE_ASSET',
    initialBehavior,
    _meta,
  );
}
