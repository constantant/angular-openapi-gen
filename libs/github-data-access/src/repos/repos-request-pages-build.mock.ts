import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposRequestPagesBuild,
  type ReposRequestPagesBuildResponse,
} from './repos-request-pages-build.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/request-pages-build',
  path: '/repos/{owner}/{repo}/pages/builds',
  method: 'post',
  tag: 'repos',
};

export const REPOS_REQUEST_PAGES_BUILD_MOCK: MockEndpoint<ReposRequestPagesBuildResponse> =
  {
    key: 'REPOS_REQUEST_PAGES_BUILD',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposRequestPagesBuild,
  };

export function provideReposRequestPagesBuildMock(
  initialBehavior?: MockEndpointBehavior<ReposRequestPagesBuildResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_REQUEST_PAGES_BUILD_MOCK, initialBehavior);
}
