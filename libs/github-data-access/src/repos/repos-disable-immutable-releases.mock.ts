import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DISABLE_IMMUTABLE_RELEASES } from './repos-disable-immutable-releases.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/disable-immutable-releases',
  path: '/repos/{owner}/{repo}/immutable-releases',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDisableImmutableReleasesMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DISABLE_IMMUTABLE_RELEASES,
    'REPOS_DISABLE_IMMUTABLE_RELEASES',
    initialBehavior,
    _meta,
  );
}
