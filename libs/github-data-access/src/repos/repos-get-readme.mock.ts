import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetReadme,
  type ReposGetReadmeResponse,
} from './repos-get-readme.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-readme',
  path: '/repos/{owner}/{repo}/readme',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_README_MOCK: MockEndpoint<ReposGetReadmeResponse> = {
  key: 'REPOS_GET_README',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposGetReadme,
};

export function provideReposGetReadmeMock(
  initialBehavior?: MockEndpointBehavior<ReposGetReadmeResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_README_MOCK, initialBehavior);
}
