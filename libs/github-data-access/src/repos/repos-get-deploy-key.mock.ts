import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import {
  provideReposGetDeployKey,
  type ReposGetDeployKeyResponse,
} from './repos-get-deploy-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-deploy-key',
  path: '/repos/{owner}/{repo}/keys/{key_id}',
  method: 'get',
  tag: 'repos',
};

export const REPOS_GET_DEPLOY_KEY_MOCK: MockEndpoint<ReposGetDeployKeyResponse> =
  {
    key: 'REPOS_GET_DEPLOY_KEY',
    baseUrl: GITHUB_BASE_URL,
    meta: _meta,
    provide: provideReposGetDeployKey,
  };

export function provideReposGetDeployKeyMock(
  initialBehavior?: MockEndpointBehavior<ReposGetDeployKeyResponse>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_GET_DEPLOY_KEY_MOCK, initialBehavior);
}
