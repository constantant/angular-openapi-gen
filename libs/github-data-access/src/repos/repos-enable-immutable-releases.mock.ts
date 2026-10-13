import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposEnableImmutableReleases } from './repos-enable-immutable-releases.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/enable-immutable-releases',
  path: '/repos/{owner}/{repo}/immutable-releases',
  method: 'put',
  tag: 'repos',
};

export const REPOS_ENABLE_IMMUTABLE_RELEASES_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_ENABLE_IMMUTABLE_RELEASES',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposEnableImmutableReleases,
};

export function provideReposEnableImmutableReleasesMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_ENABLE_IMMUTABLE_RELEASES_MOCK,
    initialBehavior,
  );
}
