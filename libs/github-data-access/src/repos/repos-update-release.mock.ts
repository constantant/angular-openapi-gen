import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposUpdateRelease,
  type ReposUpdateReleaseResponse,
} from './repos-update-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-release',
  path: '/repos/{owner}/{repo}/releases/{release_id}',
  method: 'patch',
  tag: 'repos',
};

export const REPOS_UPDATE_RELEASE_MOCK: MockEndpoint<ReposUpdateReleaseResponse> =
  {
    key: 'REPOS_UPDATE_RELEASE',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposUpdateRelease,
  };

export function provideReposUpdateReleaseMock(
  initialBehavior?: MockEndpointBehavior<ReposUpdateReleaseResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_UPDATE_RELEASE_MOCK, initialBehavior);
}
