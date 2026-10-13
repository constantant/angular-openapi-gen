import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDeleteDeployKey } from './repos-delete-deploy-key.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-deploy-key',
  path: '/repos/{owner}/{repo}/keys/{key_id}',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DELETE_DEPLOY_KEY_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DELETE_DEPLOY_KEY',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDeleteDeployKey,
};

export function provideReposDeleteDeployKeyMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_DELETE_DEPLOY_KEY_MOCK, initialBehavior);
}
