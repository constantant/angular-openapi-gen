import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_LATEST_PAGES_BUILD } from './repos-get-latest-pages-build.token';
import type { ReposGetLatestPagesBuildResponse } from './repos-get-latest-pages-build.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-latest-pages-build',
  path: '/repos/{owner}/{repo}/pages/builds/latest',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetLatestPagesBuildMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetLatestPagesBuildResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_LATEST_PAGES_BUILD,
    'REPOS_GET_LATEST_PAGES_BUILD',
    initialBehavior,
    _meta,
  );
}
