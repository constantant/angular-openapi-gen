import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_RELEASE_ASSET } from './repos-delete-release-asset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-release-asset',
  path: '/repos/{owner}/{repo}/releases/assets/{asset_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteReleaseAssetMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_RELEASE_ASSET,
    'REPOS_DELETE_RELEASE_ASSET',
    initialBehavior,
    _meta,
  );
}
