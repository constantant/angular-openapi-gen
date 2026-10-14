import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListPagesBuilds,
  type ReposListPagesBuildsResponse,
} from './repos-list-pages-builds.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-pages-builds',
  path: '/repos/{owner}/{repo}/pages/builds',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_PAGES_BUILDS_MOCK: MockEndpoint<ReposListPagesBuildsResponse> =
  {
    key: 'REPOS_LIST_PAGES_BUILDS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposListPagesBuilds,
  };

export function provideReposListPagesBuildsMock(
  initialBehavior?: MockEndpointBehavior<ReposListPagesBuildsResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_LIST_PAGES_BUILDS_MOCK, initialBehavior);
}
