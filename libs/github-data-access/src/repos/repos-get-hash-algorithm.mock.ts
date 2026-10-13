import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetHashAlgorithm,
  type ReposGetHashAlgorithmResponse,
} from './repos-get-hash-algorithm.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-hash-algorithm',
  path: '/repos/{owner}/{repo}/hash-algorithm',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_HASH_ALGORITHM_MOCK: MockEndpoint<ReposGetHashAlgorithmResponse> =
  {
    key: 'REPOS_GET_HASH_ALGORITHM',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetHashAlgorithm,
  };

export function provideReposGetHashAlgorithmMock(
  initialBehavior?: MockEndpointBehavior<ReposGetHashAlgorithmResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_HASH_ALGORITHM_MOCK, initialBehavior);
}
