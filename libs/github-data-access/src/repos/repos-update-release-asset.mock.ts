import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposUpdateReleaseAsset,
  type ReposUpdateReleaseAssetResponse,
} from './repos-update-release-asset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-release-asset',
  path: '/repos/{owner}/{repo}/releases/assets/{asset_id}',
  method: 'patch',
  tag: 'repos',
};

export const REPOS_UPDATE_RELEASE_ASSET_MOCK: MockEndpoint<ReposUpdateReleaseAssetResponse> =
  {
    key: 'REPOS_UPDATE_RELEASE_ASSET',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdateReleaseAsset,
  };

export function provideReposUpdateReleaseAssetMock(
  initialBehavior?: MockEndpointBehavior<ReposUpdateReleaseAssetResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_UPDATE_RELEASE_ASSET_MOCK, initialBehavior);
}
