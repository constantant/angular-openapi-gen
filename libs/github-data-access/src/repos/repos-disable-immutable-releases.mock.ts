import { EnvironmentProviders } from '@angular/core';
import { provideMockEndpoint } from '@constantant/openapi-resource-mocks';
import type {
  MockEndpoint,
  MockEndpointBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { GITHUB_BASE_URL } from '../api-base-url.token';
import { provideReposDisableImmutableReleases } from './repos-disable-immutable-releases.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/disable-immutable-releases',
  path: '/repos/{owner}/{repo}/immutable-releases',
  method: 'delete',
  tag: 'repos',
};

export const REPOS_DISABLE_IMMUTABLE_RELEASES_MOCK: MockEndpoint<unknown> = {
  key: 'REPOS_DISABLE_IMMUTABLE_RELEASES',
  baseUrl: GITHUB_BASE_URL,
  meta: _meta,
  provide: provideReposDisableImmutableReleases,
};

export function provideReposDisableImmutableReleasesMock(
  initialBehavior?: MockEndpointBehavior<unknown>,
): EnvironmentProviders {
  return provideMockEndpoint(
    REPOS_DISABLE_IMMUTABLE_RELEASES_MOCK,
    initialBehavior,
  );
}
