import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDeleteRelease } from './repos-delete-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-release',
  path: '/repos/{owner}/{repo}/releases/{release_id}',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DELETE_RELEASE_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DELETE_RELEASE',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDeleteRelease,
};

export function provideReposDeleteReleaseMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(REPOS_DELETE_RELEASE_MOCK, initialBehavior);
}
