import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_LATEST_RELEASE } from './repos-get-latest-release.token';
import type { ReposGetLatestReleaseResponse } from './repos-get-latest-release.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-latest-release',
  path: '/repos/{owner}/{repo}/releases/latest',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetLatestReleaseMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetLatestReleaseResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_LATEST_RELEASE,
    'REPOS_GET_LATEST_RELEASE',
    initialBehavior,
    _meta,
  );
}
