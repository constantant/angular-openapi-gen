import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetReleaseAsset,
  type ReposGetReleaseAssetResponse,
} from './repos-get-release-asset.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-release-asset',
  path: '/repos/{owner}/{repo}/releases/assets/{asset_id}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_RELEASE_ASSET_MOCK: MockEndpoint<ReposGetReleaseAssetResponse> =
  {
    key: 'REPOS_GET_RELEASE_ASSET',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetReleaseAsset,
  };

export function provideReposGetReleaseAssetMock(
  initialBehavior?: MockEndpointBehavior<ReposGetReleaseAssetResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_RELEASE_ASSET_MOCK, initialBehavior);
}
