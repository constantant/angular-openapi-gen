import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetLatestRelease,
  type ReposGetLatestReleaseResponse,
} from './repos-get-latest-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-latest-release',
  path: '/repos/{owner}/{repo}/releases/latest',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_LATEST_RELEASE_MOCK: MockEndpoint<ReposGetLatestReleaseResponse> =
  {
    key: 'REPOS_GET_LATEST_RELEASE',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetLatestRelease,
  };

export function provideReposGetLatestReleaseMock(
  initialBehavior?: MockEndpointBehavior<ReposGetLatestReleaseResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_LATEST_RELEASE_MOCK, initialBehavior);
}
