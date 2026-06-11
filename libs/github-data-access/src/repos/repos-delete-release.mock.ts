import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_RELEASE } from './repos-delete-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-release',
  path: '/repos/{owner}/{repo}/releases/{release_id}',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeleteReleaseMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_RELEASE,
    'REPOS_DELETE_RELEASE',
    initialBehavior,
    _meta,
  );
}
