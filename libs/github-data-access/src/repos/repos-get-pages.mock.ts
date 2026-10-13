import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetPages,
  type ReposGetPagesResponse,
} from './repos-get-pages.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-pages',
  path: '/repos/{owner}/{repo}/pages',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_PAGES_MOCK: MockEndpoint<ReposGetPagesResponse> = {
  key: 'REPOS_GET_PAGES',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposGetPages,
};

export function provideReposGetPagesMock(
  initialBehavior?: MockEndpointBehavior<ReposGetPagesResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_PAGES_MOCK, initialBehavior);
}
