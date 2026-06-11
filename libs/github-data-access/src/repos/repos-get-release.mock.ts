import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_RELEASE } from './repos-get-release.token';
import type { ReposGetReleaseResponse } from './repos-get-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-release',
  path: '/repos/{owner}/{repo}/releases/{release_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetReleaseMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetReleaseResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_RELEASE,
    'REPOS_GET_RELEASE',
    initialBehavior,
    _meta,
  );
}
