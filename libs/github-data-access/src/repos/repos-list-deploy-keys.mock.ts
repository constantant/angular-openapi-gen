import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposListDeployKeys,
  type ReposListDeployKeysResponse,
} from './repos-list-deploy-keys.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/list-deploy-keys',
  path: '/repos/{owner}/{repo}/keys',
  method: 'get',
  tag: 'repos',
};

export const REPOS_LIST_DEPLOY_KEYS_MOCK: MockEndpoint<ReposListDeployKeysResponse> =
  {
    key: 'REPOS_LIST_DEPLOY_KEYS',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposListDeployKeys,
  };

export function provideReposListDeployKeysMock(
  initialBehavior?: MockEndpointBehavior<ReposListDeployKeysResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_LIST_DEPLOY_KEYS_MOCK, initialBehavior);
}
