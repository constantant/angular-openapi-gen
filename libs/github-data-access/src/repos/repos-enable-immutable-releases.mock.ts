import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_ENABLE_IMMUTABLE_RELEASES } from './repos-enable-immutable-releases.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/enable-immutable-releases',
  path: '/repos/{owner}/{repo}/immutable-releases',
  method: 'put',
  tag: 'repos',
};

export function provideReposEnableImmutableReleasesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_ENABLE_IMMUTABLE_RELEASES,
    'REPOS_ENABLE_IMMUTABLE_RELEASES',
    initialBehavior,
    _meta,
  );
}
