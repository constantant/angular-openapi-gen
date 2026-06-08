import { FactoryProvider } from '@angular/core';
import { provideMockResource } from '@constantant/openapi-resource-mocks';
import type { ProviderInitialBehavior } from '@constantant/openapi-resource-mocks';
import { REPOS_DELETE_PAGES_SITE } from './repos-delete-pages-site.token';

export function provideReposDeletePagesSiteMock(
  initialBehavior?: ProviderInitialBehavior<unknown>,
): FactoryProvider {
  return provideMockResource(
    REPOS_DELETE_PAGES_SITE,
    'REPOS_DELETE_PAGES_SITE',
    initialBehavior,
  );
}
