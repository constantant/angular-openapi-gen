import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetLatestPagesBuild,
  type ReposGetLatestPagesBuildResponse,
} from './repos-get-latest-pages-build.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-latest-pages-build',
  path: '/repos/{owner}/{repo}/pages/builds/latest',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_LATEST_PAGES_BUILD_MOCK: MockEndpoint<ReposGetLatestPagesBuildResponse> =
  {
    key: 'REPOS_GET_LATEST_PAGES_BUILD',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetLatestPagesBuild,
  };

export function provideReposGetLatestPagesBuildMock(
  initialBehavior?: MockEndpointBehavior<ReposGetLatestPagesBuildResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_LATEST_PAGES_BUILD_MOCK,
    initialBehavior,
  );
}
