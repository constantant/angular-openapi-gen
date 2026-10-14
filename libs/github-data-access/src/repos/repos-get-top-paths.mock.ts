import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetTopPaths,
  type ReposGetTopPathsResponse,
} from './repos-get-top-paths.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-top-paths',
  path: '/repos/{owner}/{repo}/traffic/popular/paths',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_TOP_PATHS_MOCK: MockEndpoint<ReposGetTopPathsResponse> =
  {
    key: 'REPOS_GET_TOP_PATHS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetTopPaths,
  };

export function provideReposGetTopPathsMock(
  initialBehavior?: MockEndpointBehavior<ReposGetTopPathsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_TOP_PATHS_MOCK, initialBehavior);
}
