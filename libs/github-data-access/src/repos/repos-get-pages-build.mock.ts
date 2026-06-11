import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_PAGES_BUILD } from './repos-get-pages-build.token';
import type { ReposGetPagesBuildResponse } from './repos-get-pages-build.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-pages-build',
  path: '/repos/{owner}/{repo}/pages/builds/{build_id}',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetPagesBuildMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetPagesBuildResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_PAGES_BUILD,
    'REPOS_GET_PAGES_BUILD',
    initialBehavior,
    _meta,
  );
}
