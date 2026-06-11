import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type {
  ProviderInitialBehavior,
  MockResourceMeta,
} from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_PAGES_SITE } from './repos-delete-pages-site.token';

const _meta: MockResourceMeta = {
  specId: 'github',
  operationId: 'repos/delete-pages-site',
  path: '/repos/{owner}/{repo}/pages',
  method: 'delete',
  tag: 'repos',
};

export function provideReposDeletePagesSiteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_PAGES_SITE,
    'REPOS_DELETE_PAGES_SITE',
    initialBehavior,
    _meta,
  );
}
