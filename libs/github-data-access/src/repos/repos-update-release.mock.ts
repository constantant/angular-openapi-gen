import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_UPDATE_RELEASE } from './repos-update-release.token';
import type { ReposUpdateReleaseResponse } from './repos-update-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/update-release',
  path: '/repos/{owner}/{repo}/releases/{release_id}',
  method: 'patch',
  tag: 'repos',
};

export function provideReposUpdateReleaseMock(
  initialBehavior?: ProviderInitialBehavior<ReposUpdateReleaseResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_UPDATE_RELEASE,
    'REPOS_UPDATE_RELEASE',
    initialBehavior,
    _meta,
  );
}
