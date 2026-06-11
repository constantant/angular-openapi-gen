import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_GET_PAGES } from './repos-get-pages.token';
import type { ReposGetPagesResponse } from './repos-get-pages.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/get-pages',
  path: '/repos/{owner}/{repo}/pages',
  method: 'get',
  tag: 'repos',
};

export function provideReposGetPagesMock(
  initialBehavior?: ProviderInitialBehavior<ReposGetPagesResponse>,
): FactoryProvider {
  return provideMockResource(
    REPOS_GET_PAGES,
    'REPOS_GET_PAGES',
    initialBehavior,
    _meta,
  );
}
