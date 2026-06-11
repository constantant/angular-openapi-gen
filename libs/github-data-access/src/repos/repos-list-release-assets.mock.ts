import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_LIST_RELEASE_ASSETS } from './repos-list-release-assets.token';
import type { ReposListReleaseAssetsResponse } from './repos-list-release-assets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-release-assets',
  path: '/repos/{owner}/{repo}/releases/{release_id}/assets',
  method: 'get',
  tag: 'repos',
};

export function provideReposListReleaseAssetsMock(
  initialBehavior?: ProviderInitialBehavior<ReposListReleaseAssetsResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_LIST_RELEASE_ASSETS,
    'REPOS_LIST_RELEASE_ASSETS',
    initialBehavior,
    _meta,
  );
}
