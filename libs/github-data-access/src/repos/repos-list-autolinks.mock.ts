import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListAutolinks,
  type ReposListAutolinksResponse,
} from './repos-list-autolinks.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-autolinks',
  path: '/repos/{owner}/{repo}/autolinks',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_AUTOLINKS_MOCK: MockEndpoint<ReposListAutolinksResponse> =
  {
    key: 'REPOS_LIST_AUTOLINKS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposListAutolinks,
  };

export function provideReposListAutolinksMock(
  initialBehavior?: MockEndpointBehavior<ReposListAutolinksResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_LIST_AUTOLINKS_MOCK, initialBehavior);
}
