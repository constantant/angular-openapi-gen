import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_CHECK_IMMUTABLE_RELEASES } from './repos-check-immutable-releases.token';
import type { ReposCheckImmutableReleasesResponse } from './repos-check-immutable-releases.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/check-immutable-releases',
  path: '/repos/{owner}/{repo}/immutable-releases',
  method: 'get',
  tag: 'repos',
};

export function provideReposCheckImmutableReleasesMock(
  initialBehavior?: ProviderInitialBehavior<ReposCheckImmutableReleasesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_CHECK_IMMUTABLE_RELEASES,
    'REPOS_CHECK_IMMUTABLE_RELEASES',
    initialBehavior,
    _meta,
  );
}
