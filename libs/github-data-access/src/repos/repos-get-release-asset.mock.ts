import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_RELEASE_ASSET } from './repos-get-release-asset.token';
import type { ReposGetReleaseAssetResponse } from './repos-get-release-asset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-release-asset',
  path: '/repos/{owner}/{repo}/releases/assets/{asset_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetReleaseAssetMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetReleaseAssetResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_RELEASE_ASSET,
    'REPOS_GET_RELEASE_ASSET',
    initialBehavior,
    _meta,
  );
}
