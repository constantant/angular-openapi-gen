import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetPagesHealthCheck,
  type ReposGetPagesHealthCheckResponse,
} from './repos-get-pages-health-check.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-pages-health-check',
  path: '/repos/{owner}/{repo}/pages/health',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_PAGES_HEALTH_CHECK_MOCK: MockEndpoint<ReposGetPagesHealthCheckResponse> =
  {
    key: 'REPOS_GET_PAGES_HEALTH_CHECK',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetPagesHealthCheck,
  };

export function provideReposGetPagesHealthCheckMock(
  initialBehavior?: MockEndpointBehavior<ReposGetPagesHealthCheckResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_GET_PAGES_HEALTH_CHECK_MOCK,
    initialBehavior,
  );
}
