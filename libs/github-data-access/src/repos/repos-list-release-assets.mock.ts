import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListReleaseAssets,
  type ReposListReleaseAssetsResponse,
} from './repos-list-release-assets.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-release-assets',
  path: '/repos/{owner}/{repo}/releases/{release_id}/assets',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_RELEASE_ASSETS_MOCK: MockEndpoint<ReposListReleaseAssetsResponse> =
  {
    key: 'REPOS_LIST_RELEASE_ASSETS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposListReleaseAssets,
  };

export function provideReposListReleaseAssetsMock(
  initialBehavior?: MockEndpointBehavior<ReposListReleaseAssetsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_LIST_RELEASE_ASSETS_MOCK, initialBehavior);
}
