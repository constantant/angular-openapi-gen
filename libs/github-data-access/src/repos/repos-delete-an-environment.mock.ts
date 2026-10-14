import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDeleteAnEnvironment } from './repos-delete-an-environment.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-an-environment',
  path: '/repos/{owner}/{repo}/environments/{environment_name}',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DELETE_AN_ENVIRONMENT_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DELETE_AN_ENVIRONMENT',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDeleteAnEnvironment,
};

export function provideReposDeleteAnEnvironmentMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_DELETE_AN_ENVIRONMENT_MOCK, initialBehavior);
}
